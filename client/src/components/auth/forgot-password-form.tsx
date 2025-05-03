import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { forgotPasswordSchema } from "@shared/schema";
import { useAuth } from "@/hooks/use-auth";
import { Mail, AlertCircle, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

interface ForgotPasswordFormProps {
  onBackToLoginClick: () => void;
}

export default function ForgotPasswordForm({ onBackToLoginClick }: ForgotPasswordFormProps) {
  const { forgotPasswordMutation } = useAuth();
  const [success, setSuccess] = useState(false);
  
  const form = useForm<{ email: string }>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });
  
  const onSubmit = async (data: { email: string }) => {
    forgotPasswordMutation.mutate(data, {
      onSuccess: () => {
        setSuccess(true);
        form.reset();
      }
    });
  };
  
  return (
    <div>
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Reset Password</h1>
        <p className="text-gray-600 mt-1">Enter your email to receive a password reset link</p>
      </div>
      
      {forgotPasswordMutation.isError && (
        <Alert variant="destructive" className="mb-4">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            {forgotPasswordMutation.error?.message || "Failed to send reset link. Please try again."}
          </AlertDescription>
        </Alert>
      )}
      
      {success && (
        <Alert className="mb-4 bg-green-50 border-green-200 text-green-700">
          <CheckCircle className="h-4 w-4" />
          <AlertDescription>
            Password reset link sent! Check your email.
          </AlertDescription>
        </Alert>
      )}
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Mail className="absolute left-3 top-2.5 h-4 w-4 text-gray-500" />
                    <Input
                      placeholder="Enter your email"
                      type="email"
                      className="pl-10"
                      {...field}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <Button 
            type="submit" 
            className="w-full bg-primary-800 hover:bg-primary-900"
            disabled={forgotPasswordMutation.isPending}
          >
            {forgotPasswordMutation.isPending ? "Sending..." : "Send Reset Link"}
          </Button>
          
          <div className="text-center text-sm mt-4">
            <Button type="button" variant="link" className="p-0 h-auto font-medium" onClick={onBackToLoginClick}>
              Back to Login
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
