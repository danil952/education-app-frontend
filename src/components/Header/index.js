import React, { useEffect, useState } from 'react'
import Link from 'next/link'

import styles from './header.module.css'

const Header = ({ login, actionsData }) => {
	return (
		<div className={styles.header__container}>
			<div className={styles.header__actions}>
				{actionsData.map((action) => {
					return (
						<Link href={action.link} key={action.name}>
							<a>{action.name}</a>
						</Link>
					)
				})}
			</div>
			<div>
				{login && (
					<Link href='/user'>
						<a>{login}</a>
					</Link>
				)}
				<Link href='/auth'>
					<a>{login ? 'Выйти' : 'Войти'}</a>
				</Link>
			</div>
		</div>
	)
}

export default Header
