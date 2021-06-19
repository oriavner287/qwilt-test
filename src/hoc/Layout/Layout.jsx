import React from 'react'
import PropTypes from 'prop-types'

function Layout({ children }) {
    return (
        <div>
            <main>{children}</main>
        </div>
    )
}

Layout.propTypes = {
    children: PropTypes.object.isRequired
}

export default Layout
