import { StyleSheet, useWindowDimensions } from 'react-native'
import theme, { dark } from '../../colors/ColorScheme.ts'
export default StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    backgroundColor: theme.backgroundColor,
    color: theme.text,
    alignItems: 'center'
  },
  header: {
    flexDirection: 'row',
    padding: 10,
    gap: 10
  },
  textInput: {
    flex: 1,
    color: theme.text,
    backgroundColor: theme.tint,
    padding: 10,
    marginLeft: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: theme.text
  },
  search: {
    backgroundColor: theme.tint,
    height: 40,
    width: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 400,
    borderWidth: 1,
    borderColor: theme.text
  },
  noticeContainer: {
    width: '100%',
    position: 'absolute',
    padding: 10,
    gap: 20
  },
  notice: {
    textAlign: 'center',
    color: theme.text,
    fontSize: 20,
    textAlignVertical: 'center',
    fontWeight: '600',
  },
  icon: {
    color: theme.text,
    fontSize: 40,
    textAlignVertical: 'center',
    textAlign: 'center'
  },
  body: {
    padding: 10,
    width: '100%',
    display: 'flex',
    gap: 10,
  },
  block: {
    width: '100%',
    backgroundColor: theme.tint,
    borderRadius: 10,
    boxShadow: '0 3px 20px 0 rgba(0,0,0,0.3)',
    flexDirection: 'row',
    overflow: 'hidden',
    gap: 10,
    marginBottom: 10,
    padding: 10
  },
  blockImage: {
    height: 100,
    width: 100,
    borderRadius: 20
  },
  blockInfo: {
    height: '100%',
    flex: 1,
    flexDirection: 'row',
    boxSizing: 'border-box'
  },
  blockInfoHead: {
    // backgroundColor: 'red',
    padding: 10,
    flex: 1,
    justifyContent: 'space-between'
  },
  blockInfoInfo: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'flex-end'
  },
  blockText: {
    fontWeight: 600,
    color: dark ? `rgba(255,255,255,0.6)` : `rgba(0,0,0,0.6)`
  },
  itemName: {
    color: theme.text,
    fontWeight: '600',
    fontSize: 19
  }, expiryDate: {
    color: dark ? `rgba(255,255,255,0.6)` : `rgba(0,0,0,0.6)`,
    fontSize: 12
  },
  price: {
    color: theme.text,
    fontSize: 18,
    fontWeight: '500'
  }, dateUploaded: {
    color: dark ? `rgba(255,255,255,0.6)` : `rgba(0,0,0,0.6)`,
    fontSize: 12
  }
})
