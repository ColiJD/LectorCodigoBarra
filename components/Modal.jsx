// components/Modal.js
import React from "react";
import PropTypes from "prop-types";
import { Modal, View, Text, TextInput, Button } from "react-native";

export const ManualPriceModal = ({
  visible,
  onClose,
  customPrice,
  setCustomPrice,
  onAdd,
}) => (
  <Modal
    visible={visible}
    animationType="slide"
    transparent
    onRequestClose={onClose}
  >
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0,0,0,0.5)",
      }}
    >
      <View
        style={{
          backgroundColor: "white",
          padding: 20,
          borderRadius: 10,
          width: "80%",
        }}
      >
        <Text style={{ fontSize: 18, marginBottom: 10 }}>
          Ingrese el precio:
        </Text>
        <TextInput
          placeholder="Precio"
          keyboardType="numeric"
          value={customPrice}
          onChangeText={setCustomPrice}
          style={{
            borderWidth: 1,
            borderColor: "#ccc",
            borderRadius: 5,
            padding: 10,
            marginBottom: 15,
          }}
        />
        <Button title="Agregar" onPress={onAdd} />
      </View>
    </View>
  </Modal>
);

ManualPriceModal.propTypes = {
  visible: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  customPrice: PropTypes.string.isRequired,
  setCustomPrice: PropTypes.func.isRequired,
  onAdd: PropTypes.func.isRequired,
};

export const ConfirmClearCartModal = ({ visible, onCancel, onConfirm }) => (
  <Modal
    visible={visible}
    transparent
    animationType="fade"
    onRequestClose={onCancel}
  >
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0,0,0,0.5)",
      }}
    >
      <View
        style={{
          backgroundColor: "white",
          padding: 20,
          borderRadius: 10,
          width: "80%",
          alignItems: "center",
        }}
      >
        <Text style={{ fontSize: 18, marginBottom: 20 }}>
          ¿Deseas vaciar el carrito?
        </Text>
        <View style={{ flexDirection: "row", gap: 10 }}>
          <Button title="Cancelaaaaaar" onPress={onCancel} />
          <Button title="Vaciar" color="red" onPress={onConfirm} />
        </View>
      </View>
    </View>
  </Modal>
);

ConfirmClearCartModal.propTypes = {
  visible: PropTypes.bool.isRequired,
  onCancel: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
};
