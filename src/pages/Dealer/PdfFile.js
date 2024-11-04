import React from "react";
import {
  Page,
  Text,
  Image,
  Document,
  StyleSheet,
  View,
} from "@react-pdf/renderer";

const styles = StyleSheet.create({
  productContainer: {
    border: "1px solid grey",
    borderRadius: 5,
    padding: 10,
    marginVertical: 10,
  },
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
  image: {
    width: 140,
    height: 140,
    marginRight: 15,
  },
  textContainer: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    marginBottom: 5,
    textAlign: "left",
  },
  code: {
    fontSize: 14,
    marginBottom: 5,
    textAlign: "left",
  },
  totalAmount: {
    fontSize: 14,
    color: "black",
    textAlign: "left",
  },
});

const PdfFile = () => {
  const data = [
    {
      id: 1421,
      name: "EARRING",
      code: "IBT1368",
      total_amount_18k: 88160,
      image:
        "http://admin.impel.store/public/images/uploads/item_images/IBT1368/IBT1368.jpg",
    },
    {
      id: 1422,
      name: "EARRING",
      code: "IBT1369",
      total_amount_18k: 53680,
      image:
        "http://admin.impel.store/public/images/uploads/item_images/IBT1369/IBT1369.jpg",
    },
    {
      id: 1423,
      name: "EARRING",
      code: "IBT1370",
      total_amount_18k: 60000,
      image:
        "http://admin.impel.store/public/images/uploads/item_images/IBT1370/IBT1370.jpg",
    },
    {
      id: 1424,
      name: "EARRING",
      code: "IBT1371",
      total_amount_18k: 75000,
      image:
        "http://admin.impel.store/public/images/uploads/item_images/IBT1371/IBT1371.jpg",
    },
  ];

  return (
    <Document>
      <Page>
        {data.map((page) => (
          <View key={page.id} style={styles.productContainer}>
            <View style={styles.container}>
              <Image style={styles.image} src={page.image} />
              <View style={styles.textContainer}>
                <Text style={styles.name}>{page.name}</Text>
                <Text style={styles.code}>{page.code}</Text>
                <Text style={styles.totalAmount}>₹{page.total_amount_18k}</Text>
              </View>
            </View>
          </View>
        ))}
      </Page>
    </Document>
  );
};

export default PdfFile;
