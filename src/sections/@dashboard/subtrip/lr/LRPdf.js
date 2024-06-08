/* eslint-disable jsx-a11y/alt-text */
import PropTypes from 'prop-types';
import { Page, View, Text, Document, StyleSheet } from '@react-pdf/renderer';
import styles from './style';

// ----------------------------------------------------------------------

SubtripPDF.propTypes = {
  subtrip: PropTypes.object,
};

export default function SubtripPDF({ subtrip }) {
  const {
    fromLocation,
    toLocation,
    orderNo,
    vehicleNo,
    quantity,
    noOfBags,
    driverName,
    mobileNo,
    driverDLNo,
    vehicleType,
    details,
  } = subtrip;

  return (
    <Document>
      <Page size="A5" style={styles.page}>
        <View style={[styles.header, styles.mb40]}>
          <Text style={styles.h3}>Subtrip Details</Text>
        </View>

        <View style={[styles.gridContainer, styles.mb40]}>
          <View style={styles.col6}>
            <Text style={[styles.overline, styles.mb8]}>From Location</Text>
            <Text style={styles.body1}>{fromLocation}</Text>
          </View>

          <View style={styles.col6}>
            <Text style={[styles.overline, styles.mb8]}>To Location</Text>
            <Text style={styles.body1}>{toLocation}</Text>
          </View>
        </View>

        <View style={[styles.gridContainer, styles.mb40]}>
          <View style={styles.col6}>
            <Text style={[styles.overline, styles.mb8]}>Order No</Text>
            <Text style={styles.body1}>{orderNo}</Text>
          </View>

          <View style={styles.col6}>
            <Text style={[styles.overline, styles.mb8]}>Vehicle No</Text>
            <Text style={styles.body1}>{vehicleNo}</Text>
          </View>
        </View>

        <View style={[styles.gridContainer, styles.mb40]}>
          <View style={styles.col6}>
            <Text style={[styles.overline, styles.mb8]}>Quantity</Text>
            <Text style={styles.body1}>{quantity}</Text>
          </View>

          <View style={styles.col6}>
            <Text style={[styles.overline, styles.mb8]}>No of Bags</Text>
            <Text style={styles.body1}>{noOfBags}</Text>
          </View>
        </View>

        <View style={[styles.gridContainer, styles.mb40]}>
          <View style={styles.col6}>
            <Text style={[styles.overline, styles.mb8]}>Driver Name</Text>
            <Text style={styles.body1}>{driverName}</Text>
          </View>

          <View style={styles.col6}>
            <Text style={[styles.overline, styles.mb8]}>Mobile No</Text>
            <Text style={styles.body1}>{mobileNo}</Text>
          </View>
        </View>

        <View style={[styles.gridContainer, styles.mb40]}>
          <View style={styles.col6}>
            <Text style={[styles.overline, styles.mb8]}>Driver DL No</Text>
            <Text style={styles.body1}>{driverDLNo}</Text>
          </View>

          <View style={styles.col6}>
            <Text style={[styles.overline, styles.mb8]}>Vehicle Type</Text>
            <Text style={styles.body1}>{vehicleType}</Text>
          </View>
        </View>

        <Text style={[styles.overline, styles.mb8]}>Details</Text>

        <View style={styles.table}>
          <View style={styles.tableHeader}>
            <View style={[styles.tableRow, styles.tableHeaderRow]}>
              <View style={[styles.tableCell, styles.tableCell_1]}>
                <Text style={styles.subtitle2}>#</Text>
              </View>

              <View style={[styles.tableCell, styles.tableCell_2]}>
                <Text style={styles.subtitle2}>Description</Text>
              </View>

              <View style={[styles.tableCell, styles.tableCell_3]}>
                <Text style={styles.subtitle2}>Amount</Text>
              </View>
            </View>
          </View>

          <View style={styles.tableBody}>
            {/* {details.map((item, index) => (
              <View style={styles.tableRow} key={item.id}>
                <View style={[styles.tableCell, styles.tableCell_1]}>
                  <Text>{index + 1}</Text>
                </View>

                <View style={[styles.tableCell, styles.tableCell_2]}>
                  <Text style={styles.subtitle2}>{item.description}</Text>
                </View>

                <View style={[styles.tableCell, styles.tableCell_3]}>
                  <Text>{item.amount}</Text>
                </View>
              </View>
            ))} */}
          </View>
        </View>
      </Page>
    </Document>
  );
}
