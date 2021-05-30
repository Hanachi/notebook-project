import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
    },
  },
  paper: {
    padding: theme.spacing(2),
  },
  form: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  fileInput: {
    width: '97%',
    margin: '10px 0',
  },
  buttonSubmit: {
    marginBottom: 10,
  },
  textarea: {
    fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
    fontWeight: '400',
    width:'100%',
    minWidth: '100',
    border: '1',
    borderColor: 'rgba(0, 0, 0, 0.23)',
    margin: theme.spacing(1),
    display: 'block',
    padding: '18.5px 14px',
    minHeight: '100px !important',
    boxSizing: 'content-box',
    letterSpacing: 'inherit',
    resize: 'vertical; max-height: 400px;',
    overflowY: 'auto !important',
  },
}));