import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  media: {
    height: 0,
    paddingTop: '30.25%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    backgroundBlendMode: 'darken',
  },
  border: {
    border: 'solid',
  },
  card: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    borderRadius: '3px',
    height:'350px',
    maxHeight: '100%',
    position: 'relative',
  },
  overlay: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    top: '20px',
    left: '20px',
    color: 'white',
  },
  overlayUpdate: {
    position: 'absolute',
    top: '20px',
    right: '0px',
    color: 'white',
  },
  overlayInfo: {
    marginLeft:'10px',
  },
  grid: {
    display: 'flex',
  },
  details: {
    display: 'flex',
    justifyContent: 'space-between',
    margin: '10px',
  },
  title: {
    padding: '0 16px',
  },
  cardActions: {
    padding: '0 16px 8px 16px',
    display: 'flex',
    justifyContent: 'flex-end',
  },
  cardMessage: {
    overflowY: 'auto',
  },
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
}));