import theme from '../../../../../../colors/ColorScheme'
import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    backgroundColor: theme.backgroundColor
  },
  block: {
    padding: 20,
    flexDirection: 'row',
    gap: 10,
    justifyContent: 'space-between',
    alignItems: 'center'

  },
  text: {
    color: theme.text,
    fontSize: 20
  }
})
