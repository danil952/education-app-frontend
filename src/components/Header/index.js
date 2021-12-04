import React, { useEffect, useState } from 'react'
import Link from 'next/link'

import styles from './header.module.css'

const Header = ({ login }) => {
	return (
		<div className={styles.header__container}>
			{login && (
				<Link href='/user'>
					<a>{login}</a>
				</Link>
			)}
			<Link href='/auth'>
				<a>{login ? 'Выйти' : 'Войти'}</a>
			</Link>
		</div>
	)
}

export default Header
