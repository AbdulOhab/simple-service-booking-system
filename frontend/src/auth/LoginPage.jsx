import { useState } from 'react';
import { login } from '../api/auth';
import { useNavigate, Link } from 'react-router-dom';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [remember, setRemember] = useState(false);
    const [errors, setErrors] = useState({});
    const [generalError, setGeneralError] = useState('');
    const [status, setStatus] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setErrors({});
        setGeneralError('');

        const result = await login(email, password, remember);

        if (result.success) {
            const user = result.data.data.user;
            localStorage.setItem('token', result.data.data.token);

            // role check করে route পাঠানো
            if (user.role === 'admin') {
                navigate('/admin/dashboard');
            } else if (user.role === 'customer') {
                navigate('/customer/dashboard');
            } else {
                navigate('/'); // fallback
            }
        } else {
            // Handle different types of errors
            if (result.errors && Object.keys(result.errors).length > 0) {
                // Validation errors (field-specific)
                setErrors(result.errors);
            } else if (result.message) {
                // General errors (wrong credentials, etc.)
                setGeneralError(result.message);
            } else {
                setGeneralError('An unexpected error occurred. Please try again.');
            }
        }

        setLoading(false);
    };

    // বাকি component code একই থাকবে...
    return (
        <div className="flex min-h-screen flex-col items-center bg-[#FDFDFC] p-6 text-[#1b1b18] lg:justify-center lg:p-8 dark:bg-[#0a0a0a]">
            {/* Header section */}
            <header className="mb-6 w-full max-w-[335px] text-sm not-has-[nav]:hidden lg:max-w-4xl">
                <nav className="flex items-center justify-end gap-4">
                    <Link
                        to="/register"
                        className="inline-block rounded-sm border border-[#19140035] px-5 py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-[#1915014a] dark:border-[#3E3E3A] dark:text-[#EDEDEC] dark:hover:border-[#62605b]"
                    >
                        Register
                    </Link>
                </nav>
            </header>

            <div className="w-full max-w-sm">
                <div className="mb-8 text-center">
                    <h1 className="text-2xl font-semibold tracking-tight">Log in to your account</h1>
                    <p className="text-sm text-muted-foreground mt-2">Enter your email and password below to log in</p>
                </div>

                <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
                    <div className="grid gap-6">
                        {/* Email field */}
                        <div className="grid gap-2">
                            <label htmlFor="email" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                Email address
                            </label>
                            <input
                                id="email"
                                type="email"
                                required
                                autoFocus
                                tabIndex={1}
                                autoComplete="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="email@example.com"
                                className="flex h-10 w-full rounded-md border border-[#19140035] bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-[#3E3E3A]"
                                disabled={loading}
                            />
                            {errors.email && (
                                <p className="text-sm font-medium text-red-500">{errors.email[0]}</p>
                            )}
                        </div>

                        {/* Password field */}
                        <div className="grid gap-2">
                            <div className="flex items-center">
                                <label htmlFor="password" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                    Password
                                </label>
                            </div>
                            <input
                                id="password"
                                type="password"
                                required
                                tabIndex={2}
                                autoComplete="current-password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Password"
                                className="flex h-10 w-full rounded-md border border-[#19140035] bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-[#3E3E3A]"
                                disabled={loading}
                            />
                            {errors.password && (
                                <p className="text-sm font-medium text-red-500">{errors.password[0]}</p>
                            )}
                        </div>

                        {/* Remember me checkbox */}
                        <div className="flex items-center space-x-3">
                            <input
                                id="remember"
                                name="remember"
                                type="checkbox"
                                checked={remember}
                                onChange={(e) => setRemember(e.target.checked)}
                                tabIndex={3}
                                className="h-4 w-4 rounded border border-[#19140035] text-[#1b1b18] shadow focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-[#3E3E3A]"
                            />
                            <label
                                htmlFor="remember"
                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                                Remember me
                            </label>
                        </div>

                        {/* General error message */}
                        {generalError && (
                            <div className="rounded-md bg-red-50 p-4 dark:bg-red-950">
                                <p className="text-sm font-medium text-red-800 dark:text-red-200">{generalError}</p>
                            </div>
                        )}

                        {/* Submit button */}
                        <button
                            type="submit"
                            className="mt-4 w-full inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-[#1b1b18] text-white hover:bg-[#1b1b18]/90 h-10 px-4 py-2 dark:bg-[#EDEDEC] dark:text-[#1b1b18] dark:hover:bg-[#EDEDEC]/90"
                            tabIndex={4}
                            disabled={loading}
                        >
                            {loading && (
                                <svg className="mr-2 h-4 w-4 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                            )}
                            {loading ? 'Logging in...' : 'Log in'}
                        </button>
                    </div>

                    <div className="text-center text-sm text-muted-foreground">
                        Don't have an account?{' '}
                        <Link
                            to="/register"
                            className="text-[#1b1b18] underline-offset-4 hover:underline dark:text-[#EDEDEC]"
                            tabIndex={5}
                        >
                            Sign up
                        </Link>
                    </div>
                </form>

                {status && (
                    <div className="mb-4 text-center text-sm font-medium text-green-600">{status}</div>
                )}
            </div>

            <div className="hidden h-14.5 lg:block"></div>
        </div>
    );
}