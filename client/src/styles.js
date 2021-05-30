import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
	appBar: {
		borderRadius: 5,
		margin: '30px 0',
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
	},
	heading: {
		color: 'rgba(53, 51, 97, 1)',
		fontFamily: 'Brush Script MT',
	},
	image: {
		marginLeft: '15px',
	},
	loader: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
	},
	[theme.breakpoints.down('sm')]: {
		mainContainer: {
			flexDirection:'column-reverse',
		}
	}
}));