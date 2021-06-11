import React from 'react'

export default function Copyright(props) {
	const year = new Date().getFullYear()

	return(
	   <div className="copyright">
	      <small>Designed &amp; Developed By: Ahmed Saeed</small>
	      <div>&copy; All rights received for ahmedsaeed.site <strong>{year}</strong>.</div>
	   </div>
	)
}