import { useState } from 'react';
import { register } from '../api/auth';
import { useNavigate, Link } from 'react-router-dom';

export default function RegisterPage() {
    const [form, setForm] = useState({
        name: '',
        email: '',
        password: '',
        password_confirmation: ''
    });
    const [errors, setErrors] = useState({});
    const [generalError, setGeneralError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });

        // Clear specific field error when user starts typing
        if (errors[e.target.name]) {
            setErrors({ ...errors, [e.target.name]: null });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setErrors({});
        setGeneralError('');

        const result = await register(form);

        if (result.success) {
            localStorage.setItem('token', result.data.data.token);
            alert('Registration successful!');
            navigate('/dashboard');
        } else {
            if (result.errors) {
                setErrors(result.errors);
            } else {
                setGeneralError(result.message);
            }
        }

        setLoading(false);
    };

    const getFieldError = (fieldName) => {
        return errors[fieldName] ? errors[fieldName][0] : null;
    };

    return (
        <div className="flex min-h-screen flex-col items-center bg-[#FDFDFC] p-6 text-[#1b1b18] lg:justify-center lg:p-8 dark:bg-[#0a0a0a]">
            <header className="mb-6 w-full max-w-[335px] text-sm not-has-[nav]:hidden lg:max-w-4xl">
                <nav className="flex items-center justify-end gap-4">
                    <Link
                        to="/login"
                        className="inline-block rounded-sm border border-[#19140035] px-5 py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-[#1915014a] dark:border-[#3E3E3A] dark:text-[#EDEDEC] dark:hover:border-[#62605b]"
                    >
                        Log in
                    </Link>
                </nav>
            </header>

            <div className="w-full max-w-sm">
                <div className="mb-8 text-center">
                    <h1 className="text-2xl font-semibold tracking-tight">Create an account</h1>
                    <p className="text-sm text-muted-foreground mt-2">Enter your details below to create your account</p>
                </div>

                <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
                    <div className="grid gap-6">
                        {/* Name Field */}
                        <div className="grid gap-2">
                            <label htmlFor="name" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                Name
                            </label>
                            <input
                                id="name"
                                type="text"
                                name="name"
                                required
                                autoFocus
                                tabIndex={1}
                                autoComplete="name"
                                value={form.name}
                                onChange={handleChange}
                                placeholder="Full name"
                                className="flex h-10 w-full rounded-md border border-[#19140035] bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-[#3E3E3A]"
                                disabled={loading}
                            />
                            {getFieldError('name') && (
                                <p className="text-sm font-medium text-red-500">{getFieldError('name')}</p>
                            )}
                        </div>

                        {/* Email Field */}
                        <div className="grid gap-2">
                            <label htmlFor="email" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                Email address
                            </label>
                            <input
                                id="email"
                                type="email"
                                name="email"
                                required
                                tabIndex={2}
                                autoComplete="email"
                                value={form.email}
                                onChange={handleChange}
                                placeholder="email@example.com"
                                className="flex h-10 w-full rounded-md border border-[#19140035] bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-[#3E3E3A]"
                                disabled={loading}
                            />
                            {getFieldError('email') && (
                                <p className="text-sm font-medium text-red-500">{getFieldError('email')}</p>
                            )}
                        </div>

                        {/* Password Field */}
                        <div className="grid gap-2">
                            <label htmlFor="password" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                Password
                            </label>
                            <input
                                id="password"
                                type="password"
                                name="password"
                                required
                                tabIndex={3}
                                autoComplete="new-password"
                                value={form.password}
                                onChange={handleChange}
                                placeholder="Password"
                                className="flex h-10 w-full rounded-md border border-[#19140035] bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-[#3E3E3A]"
                                disabled={loading}
                            />
                            {getFieldError('password') && (
                                <p className="text-sm font-medium text-red-500">{getFieldError('password')}</p>
                            )}
                        </div>

                        {/* Password Confirmation Field */}
                        <div className="grid gap-2">
                            <label htmlFor="password_confirmation" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                Confirm password
                            </label>
                            <input
                                id="password_confirmation"
                                type="password"
                                name="password_confirmation"
                                required
                                tabIndex={4}
                                autoComplete="new-password"
                                value={form.password_confirmation}
                                onChange={handleChange}
                                placeholder="Confirm password"
                                className="flex h-10 w-full rounded-md border border-[#19140035] bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-[#3E3E3A]"
                                disabled={loading}
                            />
                            {getFieldError('password_confirmation') && (
                                <p className="text-sm font-medium text-red-500">{getFieldError('password_confirmation')}</p>
                            )}
                        </div>

                        {generalError && (
                            <p className="text-sm font-medium text-red-500 text-center">{generalError}</p>
                        )}

                        <button
                            type="submit"
                            className="mt-2 w-full inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-[#1b1b18] text-white hover:bg-[#1b1b18]/90 h-10 px-4 py-2 dark:bg-[#EDEDEC] dark:text-[#1b1b18] dark:hover:bg-[#EDEDEC]/90"
                            tabIndex={5}
                            disabled={loading}
                        >
                            {loading && (
                                <svg className="mr-2 h-4 w-4 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                            )}
                            {loading ? 'Registering...' : 'Create account'}
                        </button>
                    </div>

                    <div className="text-center text-sm text-muted-foreground">
                        Already have an account?{' '}
                        <Link
                            to="/login"
                            className="text-[#1b1b18] underline-offset-4 hover:underline dark:text-[#EDEDEC]"
                            tabIndex={6}
                        >
                            Log in
                        </Link>
                    </div>
                </form>
            </div>

            <div className="hidden h-14.5 lg:block"></div>
        </div>
    );
}