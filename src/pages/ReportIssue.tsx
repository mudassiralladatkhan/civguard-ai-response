
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import { Camera, MapPin, Loader2 } from "lucide-react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Progress } from "@/components/ui/progress";

const ReportIssue = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
    category: "",
  });
  
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [aiClassification, setAiClassification] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedImage(file);
      
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
      
      // Simulate AI classification
      simulateAiClassification();
    }
  };

  const simulateAiClassification = () => {
    setIsUploading(true);
    setUploadProgress(0);
    
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          // Once "upload" is complete, simulate AI classification
          const categories = ["Road Damage", "Garbage", "Graffiti", "Water Leak", "Broken Street Light"];
          const randomCategory = categories[Math.floor(Math.random() * categories.length)];
          setAiClassification(randomCategory);
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // This would be replaced with actual API call once Supabase is integrated
    console.log("Report submission:", { 
      ...formData, 
      aiClassification: aiClassification || formData.category,
      imageFile: selectedImage 
    });

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast({
        title: "Report Submitted Successfully",
        description: "Your issue has been reported and will be reviewed by our team.",
      });
      
      // Reset form
      setFormData({
        title: "",
        description: "",
        location: "",
        category: "",
      });
      setSelectedImage(null);
      setPreview(null);
      setAiClassification(null);
    } catch (error) {
      toast({
        title: "Submission Failed",
        description: "There was an error submitting your report. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Simulate using device location
  const handleGetLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setFormData({
            ...formData,
            location: `${latitude.toFixed(6)}, ${longitude.toFixed(6)}`,
          });
          toast({
            title: "Location Detected",
            description: "Your current location has been added to the report.",
          });
        },
        () => {
          toast({
            title: "Location Error",
            description: "Unable to get your current location. Please enter it manually.",
            variant: "destructive",
          });
        }
      );
    } else {
      toast({
        title: "Geolocation Not Supported",
        description: "Your browser doesn't support geolocation. Please enter your location manually.",
        variant: "destructive",
      });
    }
  };

  return (
    <DashboardLayout userRole="citizen">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Report an Issue</h1>
        
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="title">Issue Title</Label>
                <Input
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="Brief title describing the issue"
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Provide details about the issue..."
                  rows={4}
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="location">Location</Label>
                <div className="flex gap-2">
                  <Input
                    id="location"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    placeholder="Address or coordinates"
                    required
                    className="flex-1"
                  />
                  <Button type="button" variant="outline" onClick={handleGetLocation}>
                    <MapPin size={18} className="mr-2" />
                    Detect
                  </Button>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  You can enter an address, landmark, or use "Detect" to use your current location.
                </p>
              </div>
              
              <div>
                <Label htmlFor="category">Category</Label>
                <Select
                  value={formData.category}
                  onValueChange={(value) => handleSelectChange("category", value)}
                >
                  <SelectTrigger id="category">
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="road_damage">Road Damage</SelectItem>
                    <SelectItem value="garbage">Garbage</SelectItem>
                    <SelectItem value="graffiti">Graffiti</SelectItem>
                    <SelectItem value="water_leak">Water Leak</SelectItem>
                    <SelectItem value="street_light">Broken Street Light</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
                
                {aiClassification && (
                  <div className="mt-2 p-2 bg-green-50 border border-green-100 rounded-md">
                    <p className="text-sm text-green-800">
                      <span className="font-medium">AI Classification:</span> {aiClassification}
                    </p>
                  </div>
                )}
              </div>
              
              <div>
                <Label>Upload Photo (Optional)</Label>
                <div className="mt-1 flex items-center">
                  <label 
                    htmlFor="photo-upload" 
                    className="cursor-pointer flex items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg hover:border-primary/50 transition-colors"
                  >
                    {preview ? (
                      <img 
                        src={preview} 
                        alt="Preview" 
                        className="h-full object-contain" 
                      />
                    ) : (
                      <div className="flex flex-col items-center justify-center text-gray-500">
                        <Camera size={32} className="mb-2" />
                        <span className="text-sm">Click to upload a photo</span>
                      </div>
                    )}
                  </label>
                  <input
                    id="photo-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </div>
                
                {isUploading && (
                  <div className="mt-2">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-medium text-gray-500">Analyzing image...</span>
                      <span className="text-xs font-medium text-gray-500">{uploadProgress}%</span>
                    </div>
                    <Progress value={uploadProgress} className="h-1" />
                  </div>
                )}
              </div>
            </div>
            
            <Button 
              type="submit" 
              className="w-full"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 size={18} className="mr-2 animate-spin" />
                  Submitting Report...
                </>
              ) : (
                "Submit Report"
              )}
            </Button>
          </form>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ReportIssue;
