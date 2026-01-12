import { formatFullDateBR } from '@/lib/utils';
import type { Report } from '@/types/report';
import { Document, Page, StyleSheet, Text, View } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    padding: 40,
    backgroundColor: '#18181b',
    color: '#fafafa',
    fontFamily: 'Helvetica',
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: 12,
    width: '100%',
  },
  dateText: {
    textAlign: 'center',
    textTransform: 'capitalize',
    fontSize: 12,
    marginBottom: 8,
  },
  summaryBox: {
    backgroundColor: '#27272a',
    borderLeft: '4px solid gray',
    borderRight: '4px solid gray',
    textAlign: 'center',
    borderRadius: 2,
    padding: 12,
    color: 'white',
    fontSize: 11,
    marginBottom: 12,
  },
  statsGrid: {
    display: 'flex',
    flexDirection: 'row',
    gap: 12,
    marginBottom: 12,
  },
  statCard: {
    backgroundColor: '#27272a',
    flex: 1,
    padding: 12,
    border: '1px solid gray',
    borderRadius: 8,
    textTransform: 'capitalize',
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
    textTransform: "capitalize"
  },
  statLabel: {
    fontSize: 10,
    color: '#a1a1aa',
    fontWeight: 'bold',
  },
  tableSection: {
    marginBottom: 12,
  },
  tableLabelText: {
    color: '#a1a1aa',
    fontSize: 9,
    textAlign: 'center',
    marginBottom: 8,
  },
  table: {
    border: '1px solid gray',
    borderRadius: 4,
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#27272a',
    borderBottom: '1px solid gray',
    padding: 8,
  },
  tableRow: {
    flexDirection: 'row',
    borderBottom: '1px solid gray',
    padding: 8,
  },
  tableCell: {
    fontSize: 9,
    flex: 1,
    textTransform: "capitalize"
  },
  tableHeaderCell: {
    fontSize: 9,
    flex: 1,
    fontWeight: 'bold',
  },
  notesBox: {
    width: '100%',
    border: '1px solid gray',
    borderRadius: 4,
    padding: 12,
    fontSize: 10,
    backgroundColor: '#27272a',
    lineHeight: 1.5,
  },
});

const ReportPDF = ({ data }: { data: Report }) => {

  if (!data) return null;

  return (
    <Document author='Victor Miralhas' creationDate={new Date(data.generatedAt)} title='Sample Report'>
      <Page size="A4" style={styles.page}>
        <View style={styles.container}>
          <Text style={styles.dateText}>{formatFullDateBR(data.generatedAt)}</Text>

          <View style={styles.summaryBox}>
            <Text>{data.summary}</Text>
          </View>

          <View style={styles.statsGrid}>
            {Object.entries(data.statistics).map(([key, value]) => (
              <View key={key} style={styles.statCard}>
                <Text style={styles.statValue}>{value}</Text>
                <Text style={styles.statLabel}>{key}</Text>
              </View>
            ))}
          </View>

          <View style={styles.tableSection}>
            <Text style={styles.tableLabelText}>Highlighted Variants:</Text>
            <View style={styles.table}>

              <View style={styles.tableHeader}>
                <Text style={styles.tableHeaderCell}>Id</Text>
                <Text style={styles.tableHeaderCell}>Gene</Text>
                <Text style={styles.tableHeaderCell}>Classification</Text>
              </View>

              {data.highlightedVariants.map((variant, index) => (
                <View key={index} style={styles.tableRow}>
                  <Text style={styles.tableCell}>{variant.id}</Text>
                  <Text style={styles.tableCell}>{variant.gene}</Text>
                  <Text style={styles.tableCell}>{variant.classification}</Text>
                </View>
              ))}
            </View>
          </View>

          <View style={styles.notesBox}>
            <Text>{data.notes}</Text>
          </View>
        </View>
      </Page>
    </Document>
  )
};

export default ReportPDF;