import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { LogOut, User as UserIcon, Shield } from "lucide-react";
import { useLocation } from "wouter";

export default function Dashboard() {
  const { user, logoutMutation } = useAuth();
  const [, navigate] = useLocation();
  
  if (!user) {
    navigate('/auth');
    return null;
  }
  
  const handleLogout = () => {
    logoutMutation.mutate();
  };
  
  const currentDate = new Date().toLocaleString();
  
  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <Card className="max-w-4xl mx-auto">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-2xl font-bold text-gray-800">Dashboard</CardTitle>
          <Button 
            variant="outline" 
            className="flex items-center gap-2"
            onClick={handleLogout}
            disabled={logoutMutation.isPending}
          >
            <LogOut className="h-4 w-4" />
            {logoutMutation.isPending ? "Logging out..." : "Logout"}
          </Button>
        </CardHeader>
        
        <CardContent>
          <div className="p-4 mb-6 bg-primary-50 rounded-lg border border-primary-100">
            <h2 className="text-lg font-medium text-primary-800 mb-2">
              Welcome, {user.username}!
            </h2>
            <p className="text-gray-700">You have successfully logged in to your account.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-3">
                  <UserIcon className="h-5 w-5 text-gray-700" />
                  <h3 className="font-medium text-gray-800">Profile Info</h3>
                </div>
                <Separator className="mb-3" />
                <p className="text-gray-600 text-sm mb-1">Username: <span className="font-medium">{user.username}</span></p>
                <p className="text-gray-600 text-sm">Email: <span className="font-medium">{user.email}</span></p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-3">
                  <Shield className="h-5 w-5 text-gray-700" />
                  <h3 className="font-medium text-gray-800">Security</h3>
                </div>
                <Separator className="mb-3" />
                <p className="text-gray-600 text-sm mb-2">Last login: <span className="font-medium">{currentDate}</span></p>
                <Button size="sm" variant="outline" className="text-primary-700 hover:text-primary-800">
                  Change password
                </Button>
              </CardContent>
            </Card>
          </div>
          
          <div className="text-center text-sm text-gray-600">
            <p>This is just a demo dashboard. In a real application, you would see more content here.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
