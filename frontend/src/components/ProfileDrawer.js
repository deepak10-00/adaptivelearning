import React from 'react';

export default function ProfileDrawer({ onClose, user }) {
    const safeUser = {
        name: user.name || user.fullName || 'Unknown User',
        email: user.email || 'unknown@example.com',
        mobile: user.mobile || 'N/A',
        departmentName: user.departmentName || '',
        adminLevel: user.adminLevel || '',
        // add more shared or specific fields as needed
    };

    const getInitials = (name) =>
        name
            .split(' ')
            .map((part) => part[0])
            .join('')
            .toUpperCase();

    return (
        <div
            className="profile-drawer"
            role="dialog"
            aria-modal="true"
            aria-labelledby="profile-drawer-title"
            style={{
                position: 'fixed',
                top: 0,
                right: 0,
                height: '100%',
                width: '320px',
                backgroundColor: '#161c29',
                color: '#fff',
                boxShadow: '-4px 0 12px rgba(0,0,0,0.5)',
                zIndex: 1000,
                display: 'flex',
                flexDirection: 'column',
                padding: '1.5rem',
            }}
        >
            <button
                className="drawer-close"
                onClick={onClose}
                aria-label="Close Profile Drawer"
                style={{
                    background: 'transparent',
                    border: 'none',
                    color: '#b8eafd',
                    fontSize: '1.8rem',
                    cursor: 'pointer',
                    alignSelf: 'flex-end',
                    marginBottom: '1rem',
                }}
            >
                ×
            </button>

            <div
                id="profile-drawer-title"
                className="profile-header"
                style={{
                    color: '#21cff3',
                    fontWeight: 'bold',
                    fontSize: '1.3rem',
                    marginBottom: '1.3rem',
                    textAlign: 'center',
                }}
            >
                Profile
            </div>

            <div
                aria-label={`Profile avatar for ${safeUser.name}`}
                style={{
                    width: 100,
                    height: 100,
                    borderRadius: '50%',
                    backgroundColor: '#21cff3',
                    color: '#23253c',
                    fontSize: '3rem',
                    fontWeight: 'bold',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 1rem',
                    userSelect: 'none',
                }}
            >
                {getInitials(safeUser.name)}
            </div>

            <div style={{ marginBottom: '16px', textAlign: 'center' }}>
                <div style={{ fontWeight: 'bold', fontSize: '1.15rem' }}>{safeUser.name}</div>
                <div style={{ color: '#b8eafd', marginBottom: '4px' }}>{safeUser.email}</div>
                <div style={{ color: '#b8eafd', marginBottom: '4px' }}>
                    <strong>Mobile Number: </strong> {safeUser.mobile}
                </div>
                {safeUser.departmentName && (
                    <div style={{ color: '#b8eafd', marginBottom: '4px' }}>
                        <strong>Department: </strong> {safeUser.departmentName}
                    </div>
                )}
                {safeUser.adminLevel && (
                    <div style={{ color: '#b8eafd', marginBottom: '4px' }}>
                        <strong>Admin Level: </strong> {safeUser.adminLevel}
                    </div>
                )}
                {/* Retain other optional student fields if passed */}
                {safeUser.program && (
                    <div style={{ color: '#b8eafd', marginBottom: '4px' }}>
                        <strong>Program: </strong> {safeUser.program}
                    </div>
                )}
                {safeUser.progress && (
                    <div style={{ color: '#b8eafd', marginBottom: '4px' }}>
                        <strong>Progress: </strong> {safeUser.progress}
                    </div>
                )}
            </div>

            <button
                className="profile-btn blue-btn"
                type="button"
                style={{
                    width: '100%',
                    marginBottom: '10px',
                    backgroundColor: '#2563eb',
                    border: 'none',
                    borderRadius: '0.5rem',
                    color: 'white',
                    fontWeight: '600',
                    padding: '0.75rem',
                    cursor: 'pointer',
                    transition: 'background-color 0.3s ease',
                }}
                onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#1d4ed8')}
                onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#2563eb')}
                onClick={() => alert('Update Profile clicked')}
            >
                Update Profile
            </button>

            <button
                className="profile-btn red-btn"
                type="button"
                style={{
                    width: '100%',
                    marginBottom: '14px',
                    backgroundColor: '#dc2626',
                    border: 'none',
                    borderRadius: '0.5rem',
                    color: 'white',
                    fontWeight: '600',
                    padding: '0.75rem',
                    cursor: 'pointer',
                    transition: 'background-color 0.3s ease',
                }}
                onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#b91c1c')}
                onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#dc2626')}
                onClick={() => alert('Change Password clicked')}
            >
                Change Password
            </button>

            <div style={{ flexGrow: 1 }} />

            <div style={{ marginTop: 0 }}>
                <div
                    style={{
                        fontWeight: 'bold',
                        color: '#b8eafd',
                        fontSize: '1rem',
                        marginBottom: '6px',
                    }}
                >
                    Terms & Conditions
                </div>
                <textarea
                    className="terms-box"
                    rows={5}
                    readOnly
                    value={`By using this platform, you agree to follow the institution's policies regarding academic honesty, responsible use of learning resources, and data privacy. Any misuse of the system may result in suspension of your account.`}
                    style={{
                        width: '100%',
                        resize: 'none',
                        background: '#23253c',
                        color: '#b8eafd',
                        padding: '0.8rem',
                        borderRadius: '0.6rem',
                        border: '1px solid #384060',
                        fontSize: '0.97rem',
                        fontFamily: 'inherit',
                    }}
                />
            </div>
        </div>
    );
}
