import React, {useEffect, useState, useRef} from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import ProductCard from './component/ProductCard';
import {fetchCategories, fetchProductsByCategory} from './component/api';

interface Product {
  id: number;
  brand: string;
  category: string;
  description: string;
  discountPercentage: number;
  images: string[];
  price: number;
  rating: number;
  stock: number;
  thumbnail: string;
  title: string;
}

const App: React.FC = () => {
  const [category, setCategory] = useState<string[]>([]);
  const [products, setProduct] = useState<Product[]>([]);
  const [loadingCategory, setLoadingCategory] = useState<boolean>(true);
  const [loadingProducts, setLoadingProducts] = useState<boolean>(false);
  const [errorCategory, setErrorCategory] = useState<string | null>(null);
  const [errorProducts, setErrorProducts] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const flatListRef = useRef<FlatList<string> | null>(null);

  useEffect(() => {
    getCategory();
  }, []);

  const renderItem = ({item}: {item: string}) => {
    return (
      <View style={styles.tab}>
        <Text style={styles.tabText} onPress={() => handleProductItem(item)}>
          {item}
        </Text>
      </View>
    );
  };

  const handleProductItem = (selectedItem: string) => {
    setSelectedCategory(selectedItem);
    getProductDetails(selectedItem);
  };

  const getProductDetails = async (selectedItem: string) => {
    try {
      setLoadingProducts(true);
      const response = await fetchProductsByCategory(selectedItem);
      if (response.success) {
        setProduct(response.data || []);
      } else {
        setErrorProducts(response.error || 'Unknown error');
      }
    } finally {
      setLoadingProducts(false);
    }
  };

  const getCategory = async () => {
    try {
      setLoadingCategory(true);
      const response = await fetchCategories();
      if (response.success) {
        setCategory(response.data || []);
      } else {
        setErrorCategory(response.error || 'Unknown error');
      }
    } finally {
      setLoadingCategory(false);
    }
  };

  const handleEndReached = () => {
    if (category.length > 0 && selectedCategory) {
      const lastItem = category[category.length - 1];
      if (lastItem !== selectedCategory) {
        handleProductItem(lastItem);
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headingText}>Tab Task</Text>

      {/* Loading indicator for category */}
      {loadingCategory && <ActivityIndicator size="large" color="#0000ff" />}

      {/* Error message for category */}
      {errorCategory && <Text style={styles.errorText}>{errorCategory}</Text>}

      {/* Horizontal FlatList */}
      <FlatList
  ref={(ref) => (flatListRef.current = ref)}
  data={category}
  renderItem={renderItem}
  keyExtractor={() => Math.random() + ''}
  horizontal={true}
  onScroll={(event) => {
    const viewSize = event.nativeEvent.layoutMeasurement.width;
    const contentOffset = event.nativeEvent.contentOffset.x;

    // Calculate the index of the first fully visible item
    const index = Math.floor(contentOffset / viewSize);

    // Calculate the progress towards the next item
    const progress = (contentOffset - viewSize * index) / viewSize;

    // Check if we should switch to the next item
    if (progress > 0.1) {
      const selectedItem = category[index + 1];
      if (selectedItem !== selectedCategory) {
        handleProductItem(selectedItem);
      }
    } else {
      const selectedItem = category[index];
      if (selectedItem !== selectedCategory) {
        handleProductItem(selectedItem);
      }
    }
  }}
  onEndReached={handleEndReached}
  onEndReachedThreshold={0.1}
  scrollEventThrottle={10}
/>


      {selectedCategory && (
        <Text style={styles.selectedCategoryText}>
          Selected Category: {selectedCategory}
        </Text>
      )}

      {/* Loading indicator for products */}
      {loadingProducts && <ActivityIndicator size="large" color="#0000ff" />}

      {/* Error message for products */}
      {errorProducts && <Text style={styles.errorText}>{errorProducts}</Text>}

      {/* Vertical FlatList for products */}
      {products.length > 0 && (
        <FlatList
          data={products}
          renderItem={({item}) => <ProductCard product={item} />}
          keyExtractor={item => item.id.toString()}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
    alignItems: 'center',
  },
  tab: {
    padding: 5,
    marginRight: 10,
    backgroundColor: '#eee',
    borderRadius: 8,
  },
  tabText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  productContainer: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  productText: {
    fontSize: 16,
  },
  errorText: {
    color: 'red',
    marginTop: 10,
  },
  headingText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 20,
  },
  flatListContainer: {
    marginVertical: 20, // Add space between FlatLists
  },
  selectedCategoryText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
  },
});

export default App;
