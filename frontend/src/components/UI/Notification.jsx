import styled from 'styled-components';
import { ToastContainer } from 'react-toastify';

const StyledToast = styled(ToastContainer)`
    .Toastify__toast {
        border-radius: 0.5rem;
        padding: 1rem;
        display: flex;
        align-items: center;
        gap: 0.5rem;
        background-color: var(--background-2);
        filter: drop-shadow(0px 0px 8px rgba(0, 0, 0, 0.8));
    }

    .Toastify__toast--success {
        color: var(--text-dark);
        .Toastify__progress-bar {
        }
    }

    .Toastify__toast--error {
        color: var(--text-dark);
        .Toastify__progress-bar {
        }
    }

    .Toastify__toast--info {
        color: var(--text-dark);
        .Toastify__progress-bar {
        }
    }
`;

export default function Notification({...props}){

    return(
        <StyledToast {...props}/>
    );
}