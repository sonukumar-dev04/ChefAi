"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { Clock, Flame, Users } from "lucide-react";
import useFetch from "@/hooks/use-fetch";
import {
  getOrGenerateRecipe,
  saveRecipeToCollection,
  removeRecipeFromCollection,
} from "@/actions/recipe.actions";
import { toast } from "sonner";

import { P, StatCard } from "@/components/recipe-page/recipe-ui";
import {
  NoRecipeState,
  LoadingState,
  AuthRequiredState,
  ErrorState,
  SuspenseFallback,
} from "@/components/recipe-page/RecipeStates";
import RecipeInfoCard from "@/components/recipe-page/RecipeInfoCard";
import RecipeLeftColumn from "@/components/recipe-page/RecipeLeftColumn";
import RecipeInstructions from "@/components/recipe-page/RecipeInstructions";
import {
  ChefsTipsCard,
  SmartSwapsCard,
} from "@/components/recipe-page/RecipeExtras";

function RecipeContent() {
  const searchParams = useSearchParams();
  const recipeName = searchParams.get("cook");

  const { isLoaded: authLoaded, isSignedIn } = useUser();

  const [recipe, setRecipe] = useState(null);
  const [recipeId, setRecipeId] = useState(null);
  const [isSaved, setIsSaved] = useState(false);

  const {
    loading: loadingRecipe,
    data: recipeData,
    error: recipeError,
    fn: fetchRecipe,
  } = useFetch(getOrGenerateRecipe);
  const {
    loading: saving,
    data: saveData,
    fn: saveToCollection,
  } = useFetch(saveRecipeToCollection);
  const {
    loading: removing,
    data: removeData,
    fn: removeFromCollection,
  } = useFetch(removeRecipeFromCollection);

  useEffect(() => {
    if (!recipeName || !authLoaded || !isSignedIn || recipe) return;

    const formData = new FormData();
    formData.append("recipeName", recipeName);
    fetchRecipe(formData);
  }, [recipeName, authLoaded, isSignedIn]);

  useEffect(() => {
    if (recipeData?.success) {
      setRecipe(recipeData.recipe);
      setRecipeId(recipeData.recipeId);
      setIsSaved(recipeData.isSaved);
      toast.success(
        recipeData.fromDatabase ? "Recipe loaded!" : "Fresh recipe generated!",
      );
    }
  }, [recipeData]);

  useEffect(() => {
    if (saveData?.success) {
      if (saveData.alreadySaved) toast.info("Already in your collection");
      else {
        setIsSaved(true);
        toast.success("Saved to your collection!");
      }
    }
  }, [saveData]);

  useEffect(() => {
    if (removeData?.success) {
      setIsSaved(false);
      toast.success("Removed from collection");
    }
  }, [removeData]);

  const handleToggleSave = async () => {
    if (!recipeId) return;
    const formData = new FormData();
    formData.append("recipeId", recipeId);
    if (isSaved) await removeFromCollection(formData);
    else await saveToCollection(formData);
  };

  if (!recipeName) return <NoRecipeState />;

  if (!authLoaded) return <LoadingState recipeName={recipeName} />;

  if (!isSignedIn) return <AuthRequiredState recipeName={recipeName} />;

  if (loadingRecipe === null || loadingRecipe)
    return <LoadingState recipeName={recipeName} />;

  if (loadingRecipe === false && !recipe) {
    const isAuthError = recipeError?.message
      ?.toLowerCase()
      .includes("not authenticated");
    if (isAuthError) return <AuthRequiredState recipeName={recipeName} />;
    return <ErrorState />;
  }

  const isPro = recipeData?.isPro;

  return (
    <div className="min-h-screen pb-20" style={{ backgroundColor: P.bg }}>
      <RecipeInfoCard
        recipe={recipe}
        isSaved={isSaved}
        saving={saving}
        removing={removing}
        onToggleSave={handleToggleSave}
      />

      <div className="max-w-5xl mx-auto px-4">
        {/* Stat cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
          <StatCard
            icon={Clock}
            label="Prep"
            value={`${recipe.prepTime} min`}
          />
          <StatCard
            icon={Clock}
            label="Cook"
            value={`${recipe.cookTime} min`}
          />
          <StatCard
            icon={Users}
            label="Serves"
            value={String(recipe.servings)}
          />
          {recipe.nutrition?.calories && (
            <StatCard
              icon={Flame}
              label="Calories"
              value={String(recipe.nutrition.calories)}
            />
          )}
        </div>

        <div className="grid lg:grid-cols-3 gap-6 lg:gap-8 items-start">
          <RecipeLeftColumn recipe={recipe} isPro={isPro} />

          <div className="lg:col-span-2 space-y-6">
            <RecipeInstructions instructions={recipe.instructions} />
            <ChefsTipsCard tips={recipe.tips} isPro={isPro} />
            <SmartSwapsCard
              substitutions={recipe.substitutions}
              isPro={isPro}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function RecipePage() {
  return (
    <Suspense fallback={<SuspenseFallback />}>
      <RecipeContent />
    </Suspense>
  );
}
