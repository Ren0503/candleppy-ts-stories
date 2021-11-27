import React, { FunctionComponent } from 'react';
import "styles/auth.css";

const AuthLayout: FunctionComponent = ({ children }) => {
	return (
		<div className="auth-overlay">
			<div className="auth-modal">
				<div className="auth-form">
					{children}
				</div>
			</div>
		</div>
	);
};

export default AuthLayout;
