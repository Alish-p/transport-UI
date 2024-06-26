/* eslint-disable react/prop-types */
import { useMemo } from 'react';
import { Page, View, Text, Image, Document, Font, StyleSheet } from '@react-pdf/renderer';
import { borderBottom, borderLeft, borderTop } from '@mui/system';
import { fDate } from '../../../../utils/formatTime';
import { fCurrency } from '../../../../utils/formatNumber';

// ----------------------------------------------------------------------

Font.register({
  family: 'Roboto',
  fonts: [{ src: '/fonts/Roboto-Regular.ttf' }, { src: '/fonts/Roboto-Bold.ttf' }],
});

const useStyles = () =>
  useMemo(
    () =>
      StyleSheet.create({
        col1: { width: '8.33%' },
        col2: { width: '16.67%' },
        col4: { width: '33.33%' },
        col8: { width: '66.67%' },
        col6: { width: '50%' },
        col12: { width: '100%' },
        mb4: { marginBottom: 4 },
        mb8: { marginBottom: 8 },
        mb40: { marginBottom: 40 },
        p4: { padding: 4 },
        p8: { padding: 10 },
        p40: { padding: 40 },

        h1: { fontSize: 20, fontWeight: 700 },
        h3: { fontSize: 16, fontWeight: 700 },
        h4: { fontSize: 13, fontWeight: 700 },
        body1: { fontSize: 10 },
        body2: { fontSize: 9 },
        subtitle1: { fontSize: 10, fontWeight: 700 },
        subtitle2: { fontSize: 9, fontWeight: 700 },
        alignRight: { textAlign: 'right' },
        page: {
          fontSize: 9,
          lineHeight: 1.6,
          fontFamily: 'Roboto',
          backgroundColor: '#FFFFFF',
          textTransform: 'capitalize',
          padding: '40px 24px 120px 24px',
        },
        border: {
          border: '1px solid black',
        },
        borderNT: {
          borderBottom: '1px solid black',
          borderRight: '1px solid black',
          borderLeft: '1px solid black',
        },
        footer: {
          left: 0,
          right: 0,
          bottom: 0,
          padding: 24,
          margin: 'auto',
          borderTopWidth: 1,
          borderStyle: 'solid',
          position: 'absolute',
          borderColor: '#DFE3E8',
        },

        gridContainer: {
          flexDirection: 'row',
          justifyContent: 'space-between',
        },
        table: {
          display: 'flex',
          width: 'auto',
        },
        tableRow: {
          padding: '8px 0',
          flexDirection: 'row',
          borderBottomWidth: 1,
          borderStyle: 'solid',
          borderColor: '#DFE3E8',
        },
        noBorder: {
          paddingTop: 8,
          paddingBottom: 0,
          borderBottomWidth: 0,
        },
        tableCell_1: {
          width: '5%',
        },
        tableCell_2: {
          width: '50%',
          paddingRight: 16,
        },
        tableCell_3: {
          width: '15%',
        },
      }),
    []
  );

// ----------------------------------------------------------------------

export default function IndentPdf({ subtripData }) {
  const {
    _id,
    customerId,
    startDate,
    expenses,
    tripId: { driverId, vehicleId },
  } = subtripData;

  const styles = useStyles();

  return (
    <Document>
      <Page size="A5" style={styles.page} orientation="landscape">
        {/* Headers */}
        <View style={[styles.gridContainer, styles.border]}>
          <View style={[styles.gridContainer, styles.col8, styles.p8, styles.border]}>
            <View style={[styles.col4]}>
              <Image
                source="https://images.pexels.com/photos/17966146/pexels-photo-17966146/free-photo-of-trona-pinnacles-in-californian-desert.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load"
                style={{ width: 48, height: 48 }}
              />
            </View>

            <View style={[styles.col8, { display: 'flex', alignItems: 'center' }]}>
              <Text style={[styles.h1]}>Shree Enterprises</Text>
              <Text style={styles.body2}>Transport Contractor & Commission Agents</Text>
              <Text style={styles.body2}>Plot No 16 & 17, Jamakhandi Road, Mudhol-587313. </Text>
              <Text style={styles.body2}>Dist: BagalKot State; Karnataka</Text>
            </View>
          </View>

          <View
            style={[
              styles.gridContainer,
              styles.col4,
              styles.p8,
              styles.border,
              { display: 'flex', alignItems: 'center' },
            ]}
          >
            <View style={[styles.col6]}>
              <Text style={[styles.subtitle2, styles.mb4]}>Office</Text>
              <Text style={[styles.subtitle2, styles.mb4]}>JK</Text>
              <Text style={[styles.subtitle2, styles.mb4]}>SE</Text>
            </View>

            <View style={[styles.col6]}>
              <Text style={[styles.body2, styles.mb4]}>+7575049646</Text>
              <Text style={styles.body2}>+7575049646</Text>
              <Text style={styles.body2}>+7575049646</Text>
            </View>
          </View>
        </View>

        {/* consignor */}
        <View style={[styles.gridContainer, styles, styles.border]}>
          <View
            style={[
              styles.col8,
              styles.border,
              styles.p4,
              {
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
              },
            ]}
          >
            <View style={[{ display: 'flex' }]}>
              <Text style={[styles.subtitle2]}>TO:</Text>
              <Text style={styles.body2}>{expenses[1]?.pumpCd?.pumpName}</Text>
            </View>
          </View>

          <View style={[styles.col4, styles.gridContainer]}>
            <View
              style={[
                styles.col6,
                styles.border,
                {
                  display: 'flex',
                  alignItems: 'center',
                  flexDirection: 'row',
                  paddingHorizontal: '2px',
                },
              ]}
            >
              <Text style={[styles.subtitle2]}>LR No: </Text>
              <Text style={[styles.body2]}>{_id}</Text>
            </View>
            <View style={[styles.col6, styles.border, styles.p4]}>
              <Text style={[styles.body2, styles]}>Date :{fDate(startDate)}</Text>
            </View>
          </View>
        </View>

        {/* Declaration */}
        <View style={[styles.gridContainer, styles, styles.border]}>
          <View
            style={[
              styles.col12,
              { display: 'flex', justifyContent: 'center' },
              styles.p4,
              styles.border,
            ]}
          >
            <Text style={[styles.subtitle2]}>
              Please Pay Below Amount and Patrol to Following Vehicle Details:
            </Text>
          </View>
        </View>

        {/* Vehicle Details Header */}
        <View style={[styles.gridContainer, styles.border]}>
          <View
            style={[
              styles.col2,
              { display: 'flex', alignItems: 'center' },
              styles.p4,
              styles.border,
            ]}
          >
            <Text style={[styles.subtitle2]}>Driver Name</Text>
          </View>
          <View
            style={[
              styles.col2,
              { display: 'flex', alignItems: 'center' },
              styles.p4,
              styles.border,
            ]}
          >
            <Text style={[styles.subtitle2]}>Driver Mobile No.</Text>
          </View>
          <View
            style={[
              styles.col2,
              { display: 'flex', alignItems: 'center' },
              styles.p4,
              styles.border,
            ]}
          >
            <Text style={[styles.subtitle2]}>Vehicle No.</Text>
          </View>
          <View
            style={[
              styles.col2,
              { display: 'flex', alignItems: 'center' },
              styles.p4,
              styles.border,
            ]}
          >
            <Text style={[styles.subtitle2]}>Vehicle Type</Text>
          </View>
          <View
            style={[
              styles.col2,
              { display: 'flex', alignItems: 'center' },
              styles.p4,
              styles.border,
            ]}
          >
            <Text style={[styles.subtitle2]}>Diesel (Ltr)</Text>
          </View>
          <View
            style={[
              styles.col2,
              { display: 'flex', alignItems: 'center' },
              styles.p4,
              styles.border,
            ]}
          >
            <Text style={[styles.subtitle2]}>Advance Amount (₹)</Text>
          </View>
        </View>

        {/* Values */}
        <View style={[styles.gridContainer, styles, styles.border]}>
          <View
            style={[
              styles.col2,
              { display: 'flex', alignItems: 'center' },
              styles.p4,
              styles.border,
            ]}
          >
            <Text style={[styles.body2]}>{driverId?.driverName}</Text>
          </View>
          <View
            style={[
              styles.col2,
              { display: 'flex', alignItems: 'center' },
              styles.p4,
              styles.border,
            ]}
          >
            <Text style={[styles.body2]}>{driverId?.driverCellNo}</Text>
          </View>
          <View
            style={[
              styles.col2,
              { display: 'flex', alignItems: 'center' },
              styles.p4,
              styles.border,
            ]}
          >
            <Text style={[styles.body2]}>{vehicleId?.vehicleNo}</Text>
          </View>
          <View
            style={[
              styles.col2,
              { display: 'flex', alignItems: 'center' },
              styles.p4,
              styles.border,
            ]}
          >
            <Text style={[styles.body2]}>{vehicleId?.noOfTyres} Tyre</Text>
          </View>
          <View
            style={[
              styles.col2,
              { display: 'flex', alignItems: 'center' },
              styles.p4,
              styles.border,
            ]}
          >
            <Text style={[styles.body2]}>{expenses[1]?.dieselLtr} </Text>
          </View>
          <View
            style={[
              styles.col2,
              { display: 'flex', alignItems: 'center' },
              styles.p4,
              styles.border,
            ]}
          >
            <Text style={[styles.body2]}>{expenses[0]?.amount} </Text>
          </View>
        </View>
      </Page>
    </Document>
  );
}
