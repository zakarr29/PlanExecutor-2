import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/use-auth";
import { useLocation } from "wouter";
import LoginForm from "@/components/auth/login-form";
import RegisterForm from "@/components/auth/register-form";
import ForgotPasswordForm from "@/components/auth/forgot-password-form";
import { Card, CardContent } from "@/components/ui/card";

export default function AuthPage() {
  const [currentView, setCurrentView] = useState<'login' | 'register' | 'forgotPassword'>('login');
  const { user } = useAuth();
  const [, navigate] = useLocation();

  // Redirect to home if already logged in
  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 py-8">
      <div className="w-full max-w-md">
        {currentView === 'login' && (
          <Card className="bg-white shadow-lg">
            <CardContent className="pt-6 px-8 pb-8">
              <LoginForm 
                onRegisterClick={() => setCurrentView('register')}
                onForgotPasswordClick={() => setCurrentView('forgotPassword')}
              />
            </CardContent>
          </Card>
        )}

        {currentView === 'register' && (
          <Card className="bg-white shadow-lg">
            <CardContent className="pt-6 px-8 pb-8">
              <RegisterForm 
                onLoginClick={() => setCurrentView('login')}
              />
            </CardContent>
          </Card>
        )}

        {currentView === 'forgotPassword' && (
          <Card className="bg-white shadow-lg">
            <CardContent className="pt-6 px-8 pb-8">
              <ForgotPasswordForm 
                onBackToLoginClick={() => setCurrentView('login')}
              />
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
