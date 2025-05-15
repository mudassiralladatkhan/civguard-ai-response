
import { Button } from "@/components/ui/button";
import { MapPin, Shield, BarChart, Bell } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-100">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 flex flex-col items-center text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600">
          CivGuard
        </h1>
        <h2 className="text-2xl md:text-3xl font-medium mb-6 text-gray-800">
          AI-Powered Urban Issue Reporting & Response
        </h2>
        <p className="text-lg md:text-xl mb-8 max-w-2xl text-gray-600">
          Empowering citizens and municipalities to identify, track, and resolve urban issues efficiently.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Button asChild size="lg" className="gap-2">
            <Link to="/login">
              <Shield className="h-5 w-5" />
              Get Started
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="gap-2">
            <Link to="/about">
              Learn More
            </Link>
          </Button>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold mb-12 text-center">Key Features</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <FeatureCard 
            icon={<MapPin className="h-10 w-10 text-primary" />}
            title="Live City Map"
            description="View and track all reported issues on a real-time interactive map."
          />
          <FeatureCard 
            icon={<Shield className="h-10 w-10 text-primary" />}
            title="AI Classification"
            description="Automatically categorize issues using advanced AI technology."
          />
          <FeatureCard 
            icon={<BarChart className="h-10 w-10 text-primary" />}
            title="Analytics Dashboard"
            description="Gain insights with comprehensive data visualization tools."
          />
          <FeatureCard 
            icon={<Bell className="h-10 w-10 text-primary" />}
            title="Notifications"
            description="Receive updates as your reported issues progress toward resolution."
          />
        </div>
      </section>

      {/* How It Works Section */}
      <section className="container mx-auto px-4 py-16 bg-white rounded-xl shadow-sm my-8">
        <h2 className="text-3xl font-bold mb-12 text-center">How It Works</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <StepCard
            number="1"
            title="Report an Issue"
            description="Submit issues through text or photo uploads. AI will classify them automatically."
          />
          <StepCard
            number="2"
            title="Track Progress"
            description="Follow your report's status on our live map and receive notifications."
          />
          <StepCard
            number="3"
            title="Issue Resolved"
            description="Municipal officers address the problem and mark it as resolved."
          />
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 mt-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">CivGuard</h3>
              <p className="text-gray-400">Empowering citizens. Improving cities.</p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><Link to="/login" className="text-gray-400 hover:text-white">Login</Link></li>
                <li><Link to="/register" className="text-gray-400 hover:text-white">Register</Link></li>
                <li><Link to="/about" className="text-gray-400 hover:text-white">About</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Contact</h3>
              <p className="text-gray-400">info@civguard.com</p>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-500">
            <p>&copy; {new Date().getFullYear()} CivGuard. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

const FeatureCard = ({ icon, title, description }) => (
  <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
    <div className="mb-4">{icon}</div>
    <h3 className="text-xl font-semibold mb-2">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);

const StepCard = ({ number, title, description }) => (
  <div className="flex flex-col items-center text-center">
    <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center text-xl font-bold mb-4">
      {number}
    </div>
    <h3 className="text-xl font-semibold mb-2">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);

export default Index;
