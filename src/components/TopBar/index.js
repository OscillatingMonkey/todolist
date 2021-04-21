import styles from './index.module.css'

function TopBar () {
	return (
		<div className={styles.topBar}>
			<span className={styles.topBarHeading}>{'Todo List'}</span>
		</div>
	)
}
export default TopBar
