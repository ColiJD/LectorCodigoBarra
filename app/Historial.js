import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Platform,
} from "react-native";
import { getDocs, collection } from "firebase/firestore";
import { db } from "../config/firebaseConfig";
import DateTimePicker from "@react-native-community/datetimepicker";
import * as Print from "expo-print"; // 👈 Importar para imprimir/exportar

export default function Historial() {
  const [sales, setSales] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterDate, setFilterDate] = useState(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [filteredSales, setFilteredSales] = useState([]);

  const fetchSales = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "venta"));
      const salesData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      salesData.sort((a, b) => b.date?.seconds - a.date?.seconds);
      setSales(salesData);
      setLoading(false);
    } catch (error) {
      console.error("Error al obtener ventas:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSales();
  }, []);

  useEffect(() => {
    if (!filterDate) {
      setFilteredSales(sales);
    } else {
      const selectedDate = new Date(filterDate);
      const filtered = sales.filter((sale) => {
        if (!sale.date) return false;
        const saleDate = sale.date.toDate();
        return (
          saleDate.getDate() === selectedDate.getDate() &&
          saleDate.getMonth() === selectedDate.getMonth() &&
          saleDate.getFullYear() === selectedDate.getFullYear()
        );
      });
      setFilteredSales(filtered);
    }
  }, [filterDate, sales]);

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.date}>
        Fecha: {item.date?.toDate().toLocaleString("es-HN")}
      </Text>
      <Text style={styles.total}>Total: L. {item.total.toFixed(2)}</Text>
      <Text style={styles.productsTitle}>Productos:</Text>
      {item.items.map((prod, index) => (
        <Text key={index} style={styles.productItem}>
          • {prod.name} x{prod.quantity} - L.{prod.price.toFixed(2)}
        </Text>
      ))}
    </View>
  );

  const formatDate = (date) => {
    return date
      ? `${date.getDate().toString().padStart(2, "0")}/${(date.getMonth() + 1)
          .toString()
          .padStart(2, "0")}/${date.getFullYear()}`
      : "";
  };

  // 📄 Función para imprimir/exportar historial filtrado
  const handleExportPDF = async () => {
    if (filteredSales.length === 0) {
      alert("No hay ventas para exportar.");
      return;
    }

    const htmlContent = `
      <html>
        <head>
          <meta charset="utf-8" />
          <style>
            body { font-family: Arial, sans-serif; padding: 20px; }
            h1 { text-align: center; }
            table { width: 100%; border-collapse: collapse; margin-top: 20px; }
            th, td { border: 1px solid #ddd; padding: 8px; text-align: center; }
            th { background-color: #f2f2f2; }
          </style>
        </head>
        <body>
          <h1>Historial de Ventas</h1>
          ${filterDate ? `<p>Fecha filtrada: ${formatDate(filterDate)}</p>` : ""}
          <table>
            <thead>
              <tr>
                <th>Fecha</th>
                <th>Productos</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              ${filteredSales
                .map(
                  (sale) => `
                  <tr>
                    <td>${sale.date?.toDate().toLocaleString("es-HN")}</td>
                    <td>
                      ${sale.items
                        .map(
                          (p) =>
                            `${p.name} x${p.quantity} (L.${p.price.toFixed(2)})`
                        )
                        .join("<br>")}
                    </td>
                    <td>L.${sale.total.toFixed(2)}</td>
                  </tr>
                `
                )
                .join("")}
            </tbody>
          </table>
        </body>
      </html>
    `;

    try {
      await Print.printAsync({ html: htmlContent });
    } catch (error) {
      console.error("Error al generar PDF:", error);
    }
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#2196F3" />
        <Text style={styles.loadingText}>Cargando historial de ventas...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={{ height: 20 }} />

      {/* Filtros */}
      <View style={styles.filterContainer}>
        <Text style={styles.filterLabel}>Filtrar por fecha:</Text>
        <TouchableOpacity
          onPress={() => setShowDatePicker(true)}
          style={styles.dateSelector}
        >
          <Text style={styles.dateText}>
            {filterDate ? formatDate(filterDate) : "Selecciona una fecha"}
          </Text>
        </TouchableOpacity>

        {filterDate && (
          <TouchableOpacity
            onPress={() => setFilterDate(null)}
            style={styles.clearButton}
          >
            <Text style={styles.clearButtonText}>Limpiar filtro</Text>
          </TouchableOpacity>
        )}
      </View>

      {showDatePicker && (
        <DateTimePicker
          value={filterDate || new Date()}
          mode="date"
          display={Platform.OS === "ios" ? "spinner" : "default"}
          onChange={(event, selectedDate) => {
            setShowDatePicker(false);
            if (selectedDate) {
              setFilterDate(selectedDate);
            }
          }}
        />
      )}

      {/* Botón imprimir */}
      <TouchableOpacity
        onPress={handleExportPDF}
        style={{
          backgroundColor: "#4CAF50",
          padding: 10,
          borderRadius: 8,
          marginHorizontal: 15,
          marginBottom: 10,
        }}
      >
        <Text style={{ color: "white", textAlign: "center", fontWeight: "bold" }}>
          Imprimir / Exportar PDF
        </Text>
      </TouchableOpacity>

      {filteredSales.length === 0 ? (
        <View style={styles.center}>
          <Text style={styles.noSalesText}>No hay ventas para esta fecha.</Text>
        </View>
      ) : (
        <FlatList
          data={filteredSales}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#e6f0ff",
  },
  filterContainer: {
    backgroundColor: "white",
    marginHorizontal: 15,
    marginBottom: 10,
    padding: 10,
    borderRadius: 10,
    elevation: 2,
  },
  filterLabel: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 6,
    color: "#333",
  },
  dateSelector: {
    backgroundColor: "#f0f0f0",
    padding: 10,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  dateText: {
    fontSize: 16,
    color: "#000",
  },
  clearButton: {
    marginTop: 10,
    backgroundColor: "#f44336",
    paddingVertical: 8,
    borderRadius: 6,
    alignItems: "center",
  },
  clearButtonText: {
    color: "white",
    fontWeight: "700",
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: "#555",
  },
  noSalesText: {
    fontSize: 18,
    color: "#555",
  },
  listContent: {
    paddingHorizontal: 15,
    paddingBottom: 15,
  },
  card: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 15,
    marginBottom: 12,
    elevation: 3,
  },
  date: {
    color: "#666",
    marginBottom: 6,
  },
  total: {
    fontWeight: "700",
    fontSize: 15,
    color: "#1b5e20",
    marginBottom: 8,
  },
  productsTitle: {
    fontWeight: "600",
    marginBottom: 4,
    color: "#333",
  },
  productItem: {
    color: "#444",
    fontSize: 14,
    marginLeft: 10,
    marginBottom: 2,
  },
});
