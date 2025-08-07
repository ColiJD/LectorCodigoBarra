// screens/SalesHistoryScreen.js
import React, { useEffect, useState } from "react";
import { View, Text, FlatList, ActivityIndicator, StyleSheet } from "react-native";
import { getDocs, collection } from "firebase/firestore";
import { db } from "../config/firebaseConfig"; 

export default function Historial() {
  const [sales, setSales] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchSales = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "venta"));
      const salesData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      // Ordena por fecha descendente si tienes campo 'date' tipo Timestamp
      salesData.sort((a, b) => b.date?.seconds - a.date?.seconds);

      setSales(salesData);
      setLoading(false);
    } catch (error) {
      console.error("Error al obtener ventas:", error);
    }
  };

  useEffect(() => {
    fetchSales();
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.title}>Venta ID: {item.code}</Text>
      <Text>Fecha: {item.date?.toDate().toLocaleString("es-HN")}</Text>
      <Text>Total: L. {item.total.toFixed(2)}</Text>
      <Text style={{ marginTop: 5, fontWeight: "bold" }}>Productos:</Text>
      {item.items.map((prod, index) => (
        <Text key={index}>• {prod.name} x{prod.quantity} - L.{prod.price.toFixed(2)}</Text>
      ))}
    </View>
  );

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#2196F3" />
        <Text>Cargando historial de ventas...</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={sales}
      keyExtractor={(item) => item.id}
      renderItem={renderItem}
      contentContainerStyle={{ padding: 10 }}
    />
  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    backgroundColor: "#f0f0f0",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  title: {
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 5,
  },
});
