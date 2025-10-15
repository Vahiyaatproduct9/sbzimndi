import { StyleSheet } from "react-native";
import theme from "../../../../colors/ColorScheme";

export default StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: theme.backgroundColor,
    justifyContent: 'space-between'
  },
  header: {
    fontSize: 22,
    fontWeight: 600,
    color: theme.text,
    marginBottom: 20,
  },
  box: {
    width: '100%',
    padding: 10,
    boxShadow: '0 4px 10px 0 rgba(0,0,0,0.3)',
    borderRadius: 10,
    flexDirection: 'row',
    backgroundColor: theme.tint
  },
  infoContainer: {
    flex: 1,
    padding: 10,
    justifyContent: 'space-between'
  },
  title: {
    fontWeight: 600,
    color: theme.text,
    fontSize: 18,
  },
  text: {
    color: theme.text,
    fontSize: 16
  },
  imageContainer: {
    width: '30%',
    aspectRatio: 1,
    borderRadius: 5,
    overflow: 'hidden',
  },
  image: {
    height: '100%',
    width: '100%',
    objectFit: 'cover',
    borderRadius: 5
  },
  contentContainer: {
    width: '100%',
    backgroundColor: theme.tint,
    padding: 20,
    borderRadius: 20,
    marginTop: 20,
    gap: 20
  },
  contentHeader: {
    fontSize: 23,
    fontWeight: '600',
    color: theme.text,
    textAlign: 'right'
  },
  distance: {
    color: theme.text,
    textAlign: 'right'
  },
  descriptionBox: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  description: {
    color: theme.text,
    flex: 1,
    textAlign: 'right'
  },
  descriptionHead: {
    color: theme.text,
    fontWeight: '600',
  },
  paymentButton: {
    width: '70%',
    alignSelf: 'flex-end',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
    backgroundColor: theme.extra,
    borderRadius: 10,
    marginBottom: 80,
    boxShadow: '0 4px 10px 0 rgba(0,0,0,0.3)',
  },
  note: {
    width: '100%',
    padding: 30,
    backgroundColor: 'rgba(255,255,0, 0.4)',
    marginTop: 20,
    borderRadius: 10,
  },
  noteText: {
    color: theme.text,
    fontWeight: 600,
  },
  pressed: {
    backgroundColor: 'rgba(182, 125, 26, 0.5)',
    transform: 'scale(0.98)'
  },
  buttonText: {
    color: theme.text,
    fontWeight: '700',
  }
})
