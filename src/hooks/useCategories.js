import { useState, useCallback, useEffect } from 'react';
import { getCategories, saveCategories } from '../utils/storage';
import { generateCategoryId } from '../utils/helpers';

export function useCategories() {
  const [categories, setCategories] = useState(() => getCategories());

  useEffect(() => {
    saveCategories(categories);
  }, [categories]);

  const addCategory = useCallback((categoryData) => {
    const newCategory = {
      ...categoryData,
      id: generateCategoryId(),
    };
    setCategories((prev) => [...prev, newCategory]);
    return newCategory;
  }, []);

  const deleteCategory = useCallback((id) => {
    setCategories((prev) => prev.filter((c) => c.id !== id));
  }, []);

  const getCategoryById = useCallback(
    (id) => categories.find((c) => c.id === id) || null,
    [categories]
  );

  return { categories, addCategory, deleteCategory, getCategoryById };
}
