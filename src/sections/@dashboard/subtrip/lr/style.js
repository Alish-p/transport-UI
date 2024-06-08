import { StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    padding: 24,
    fontFamily: 'Helvetica',
  },
  header: {
    textAlign: 'center',
    marginBottom: 40,
  },
  gridContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 40,
  },
  col6: {
    flex: 1,
    padding: '0 8px',
  },
  mb8: {
    marginBottom: 8,
  },
  mb40: {
    marginBottom: 40,
  },
  overline: {
    fontSize: 12,
    textTransform: 'uppercase',
    color: '#555',
  },
  body1: {
    fontSize: 12,
    color: '#333',
  },
  h3: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
  },
  subtitle2: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#000',
  },
  table: {
    display: 'table',
    width: '100%',
    borderStyle: 'solid',
    borderColor: '#000',
    borderWidth: 1,
    borderRightWidth: 0,
    borderBottomWidth: 0,
  },
  tableHeader: {
    display: 'table-row-group',
  },
  tableBody: {
    display: 'table-row-group',
  },
  tableRow: {
    display: 'table-row',
  },
  tableHeaderRow: {
    backgroundColor: '#f2f2f2',
  },
  tableCell: {
    display: 'table-cell',
    borderStyle: 'solid',
    borderColor: '#000',
    borderWidth: 1,
    borderTopWidth: 0,
    borderLeftWidth: 0,
    padding: 8,
  },
  tableCell_1: {
    width: '10%',
  },
  tableCell_2: {
    width: '60%',
  },
  tableCell_3: {
    width: '30%',
    textAlign: 'right',
  },
});

export default styles;
