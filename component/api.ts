// api.ts

interface ApiResponse<T> {
    success: boolean;
    data?: T;
    error?: string;
  }
  
  export const fetchCategories = async (): Promise<ApiResponse<string[]>> => {
    try {
      const resp = await fetch('https://dummyjson.com/products/categories');
      if (!resp.ok) {
        throw new Error(`HTTP error! Status: ${resp.status}`);
      }
  
      const data = await resp.json();
      return { success: true, data };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };
  
  export const fetchProductsByCategory = async (category: string): Promise<ApiResponse<Product[]>> => {
    try {
      const resp = await fetch(`https://dummyjson.com/products/category/${category}`);
      if (!resp.ok) {
        throw new Error(`HTTP error! Status: ${resp.status}`);
      }
  
      const data = await resp.json();
      return { success: true, data: data['products'] };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };
  