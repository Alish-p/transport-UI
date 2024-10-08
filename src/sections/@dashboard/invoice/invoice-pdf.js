/* eslint-disable react/prop-types */
import { useMemo } from 'react';
import { Page, View, Text, Image, Document, Font, StyleSheet } from '@react-pdf/renderer';
// utils
import { fDate } from '../../../utils/formatTime';
import { fCurrency } from '../../../utils/formatNumber';

// Registering font
Font.register({
  family: 'Roboto',
  fonts: [{ src: '/fonts/Roboto-Regular.ttf' }, { src: '/fonts/Roboto-Bold.ttf' }],
});

const useStyles = () =>
  useMemo(
    () =>
      StyleSheet.create({
        col4: { width: '25%' },
        col8: { width: '75%' },
        col6: { width: '50%' },
        mb4: { marginBottom: 4 },
        mb8: { marginBottom: 8 },
        mb40: { marginBottom: 40 },
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
          padding: '40px 24px 120px 24px',
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
          width: '45%',
          paddingRight: 16,
        },
        tableCell_3: {
          width: '15%',
        },
      }),
    []
  );

export default function InvoicePDF({ invoice, currentStatus }) {
  const { _id, subtrips, customer, status, createdDate } = invoice;

  const totalAmount = 5000;

  const styles = useStyles();

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={[styles.gridContainer, styles.mb40]}>
          <Image source="/logo/logo_single.png" style={{ width: 48, height: 48 }} />

          <View style={{ alignItems: 'flex-end', flexDirection: 'column' }}>
            <Text style={styles.h3}>{currentStatus || 'Draft'}</Text>
            <Text>{_id || 'INV - XXX'}</Text>
          </View>
        </View>
        <View style={[styles.gridContainer, styles.mb40]}>
          <View style={styles.col6}>
            <Text style={[styles.subtitle2, styles.mb4]}>Invoice from</Text>
            <Text style={styles.body2}>Shree EnterPrise</Text>
            <Text style={styles.body2}>Mudhol Opp-Reliance Trend</Text>
            <Text style={styles.body2}>Phone: {7575049646}</Text>
          </View>

          <View style={styles.col6}>
            <Text style={[styles.subtitle2, styles.mb4]}>Invoice to</Text>
            {customer && (
              <>
                <Text style={styles.body2}>{customer.customerName}</Text>
                <Text style={styles.body2}>{customer.address}</Text>
                <Text style={styles.body2}>Phone: {customer.cellNo}</Text>
              </>
            )}
          </View>
        </View>
        <View style={[styles.gridContainer, styles.mb40]}>
          <View style={styles.col6}>
            <Text style={[styles.subtitle2, styles.mb4]}>Created</Text>
            <Text style={styles.body2}>{fDate(createdDate)}</Text>
          </View>
          <View style={styles.col6}>
            <Text style={[styles.subtitle2, styles.mb4]}>Due date</Text>
            <Text style={styles.body2}>{fDate(createdDate)}</Text>
          </View>
        </View>
        <Text style={[styles.subtitle1, styles.mb8]}>Invoice Details</Text>
        Consignee Destination Vehicle No LR No Invoice No Disp Date
        <View style={styles.table}>
          <View>
            <View style={styles.tableRow}>
              <View style={styles.tableCell_1}>
                <Text style={styles.subtitle2}>#</Text>
              </View>

              <View style={styles.tableCell_2}>
                <Text style={styles.subtitle2}>Consignee</Text>
              </View>

              <View style={styles.tableCell_3}>
                <Text style={styles.subtitle2}>Destination</Text>
              </View>

              <View style={styles.tableCell_3}>
                <Text style={styles.subtitle2}>Vehicle No</Text>
              </View>
              <View style={styles.tableCell_3}>
                <Text style={styles.subtitle2}>LR No</Text>
              </View>
              <View style={styles.tableCell_3}>
                <Text style={styles.subtitle2}>Invoice No </Text>
              </View>
              <View style={styles.tableCell_3}>
                <Text style={styles.subtitle2}>Disp Date</Text>
              </View>
              <View style={styles.tableCell_3}>
                <Text style={styles.subtitle2}>QTY(MT) </Text>
              </View>
              <View style={styles.tableCell_3}>
                <Text style={styles.subtitle2}>Rate/MT </Text>
              </View>
              <View style={styles.tableCell_3}>
                <Text style={styles.subtitle2}>Freight</Text>
              </View>
            </View>
          </View>

          <View>
            {subtrips.map((subtrip, index) => (
              <View style={styles.tableRow} key={subtrip._id}>
                <View style={styles.tableCell_1}>
                  <Text>{index + 1}</Text>
                </View>

                <View style={styles.tableCell_2}>
                  <Text style={styles.subtitle2}>{subtrip.consignee}</Text>
                  <Text>{subtrip.description}</Text>
                </View>

                <View style={styles.tableCell_3}>
                  <Text>{subtrip.unloadingPoint}</Text>
                </View>

                <View style={styles.tableCell_3}>
                  <Text>{fCurrency(subtrip._id)}</Text>
                </View>

                <View style={styles.tableCell_3}>
                  <Text>{subtrip.invoiceNo}</Text>
                </View>
                <View style={styles.tableCell_3}>
                  <Text>{fDate(subtrip.startDate)}</Text>
                </View>
                <View style={styles.tableCell_3}>
                  <Text>{subtrip.loadingWeight}</Text>
                </View>
                <View style={styles.tableCell_3}>
                  <Text>{subtrip.rate}</Text>
                </View>

                <View style={[styles.tableCell_3, styles.alignRight]}>
                  <Text>{fCurrency(subtrip.rate * subtrip.loadingWeight)}</Text>
                </View>
              </View>
            ))}

            <View style={[styles.tableRow, styles.noBorder]}>
              <View style={styles.tableCell_1} />
              <View style={styles.tableCell_2} />
              <View style={styles.tableCell_3} />
              <View style={styles.tableCell_3}>
                <Text>Subtotal</Text>
              </View>
              <View style={[styles.tableCell_3, styles.alignRight]}>
                <Text>{fCurrency(totalAmount)}</Text>
              </View>
            </View>

            <View style={[styles.tableRow, styles.noBorder]}>
              <View style={styles.tableCell_1} />
              <View style={styles.tableCell_2} />
              <View style={styles.tableCell_3} />
              <View style={styles.tableCell_3}>
                <Text>Shipping</Text>
              </View>
              <View style={[styles.tableCell_3, styles.alignRight]}>
                <Text>{fCurrency(20)}</Text>
              </View>
            </View>

            <View style={[styles.tableRow, styles.noBorder]}>
              <View style={styles.tableCell_1} />
              <View style={styles.tableCell_2} />
              <View style={styles.tableCell_3} />
              <View style={styles.tableCell_3}>
                <Text>Discount</Text>
              </View>
              <View style={[styles.tableCell_3, styles.alignRight]}>
                <Text>{fCurrency(-8)}</Text>
              </View>
            </View>

            <View style={[styles.tableRow, styles.noBorder]}>
              <View style={styles.tableCell_1} />
              <View style={styles.tableCell_2} />
              <View style={styles.tableCell_3} />
              <View style={styles.tableCell_3}>
                <Text>Taxes</Text>
              </View>
              <View style={[styles.tableCell_3, styles.alignRight]}>
                <Text>{fCurrency(20)}</Text>
              </View>
            </View>

            <View style={[styles.tableRow, styles.noBorder]}>
              <View style={styles.tableCell_1} />
              <View style={styles.tableCell_2} />
              <View style={styles.tableCell_3} />
              <View style={styles.tableCell_3}>
                <Text style={styles.h4}>Total</Text>
              </View>
              <View style={[styles.tableCell_3, styles.alignRight]}>
                <Text style={styles.h4}>{fCurrency(totalAmount)}</Text>
              </View>
            </View>
          </View>
        </View>
        <View style={[styles.gridContainer, styles.footer]} fixed>
          <View style={styles.col8}>
            <Text style={styles.subtitle2}>NOTES</Text>
            <Text>Shree EnterPrises</Text>
          </View>
          <View style={[styles.col4, styles.alignRight]}>
            <Text style={styles.subtitle2}>Have a Question?</Text>
            <Text>support@abcapp.com</Text>
          </View>
        </View>
      </Page>
    </Document>
  );
}
