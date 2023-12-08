import React from 'react';
import { StyleSheet, View, Text,} from 'react-native';

const ProductCard = ({ product }) => {
  return (
    <View style={styles.card}>
      <View style={styles.cardContent}>
        <Text style={styles.title}>{product.title}</Text>
        <Text style={styles.description}>{product.description}</Text>
        <Text style={styles.price}>Price: ${product.price}</Text>
        <Text style={styles.rating}>Rating: {product.rating}</Text>
        <Text style={styles.brand}>Brand: {product.brand}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'yellow',
    borderRadius: 8,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginBottom: 10, // Add margin to separate cards
    height: 160, // Set a fixed height for each card
    width: '90%',
  },
  cardContent: {
    
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2ecc71', // Green color
  },
  rating: {
    fontSize: 14,
    color: '#3498db', // Blue color
    marginBottom: 4,
  },
  brand: {
    fontSize: 14,
    color: '#e74c3c', // Red color
  },
});

export default ProductCard;
