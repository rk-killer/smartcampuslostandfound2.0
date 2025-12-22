import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ImageUpload } from "@/components/ImageUpload";
import { MapPin, Calendar, Tag, FileText, Send, CheckCircle } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useCreateItem, useUploadImage } from "@/hooks/useItems";

const categories = [
  "ID Card",
  "Wallet",
  "Phone",
  "Keys",
  "Books",
  "Electronics",
  "Clothing",
  "Others",
];

export default function ReportFound() {
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();
  const createItem = useCreateItem();
  const uploadImage = useUploadImage();

  const [formData, setFormData] = useState({
    itemName: "",
    category: "",
    description: "",
    date: "",
    location: "",
    contact: "",
  });
  const [image, setImage] = useState<File | null>(null);

  useEffect(() => {
    if (!authLoading && !user) {
      navigate("/auth");
    }
  }, [user, authLoading, navigate]);

  useEffect(() => {
    if (user?.email) {
      setFormData((prev) => ({ ...prev, contact: user.email || "" }));
    }
  }, [user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    let imageUrl: string | undefined;

    if (image) {
      imageUrl = await uploadImage.mutateAsync(image);
    }

    await createItem.mutateAsync({
      title: formData.itemName,
      category: formData.category,
      description: formData.description,
      status: "found",
      location: formData.location,
      item_date: formData.date,
      image_url: imageUrl,
      contact_email: formData.contact,
    });

    // Reset form
    setFormData({
      itemName: "",
      category: "",
      description: "",
      date: "",
      location: "",
      contact: user?.email || "",
    });
    setImage(null);

    navigate("/my-match");
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const isSubmitting = createItem.isPending || uploadImage.isPending;

  if (authLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-28 pb-20 px-4">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-10"
          >
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-secondary/20 border border-secondary/30 mb-4">
              <MapPin className="w-8 h-8 text-secondary" />
            </div>
            <h1 className="text-3xl md:text-4xl font-display font-bold mb-3">
              Report <span className="text-secondary">Found</span> Item
            </h1>
            <p className="text-muted-foreground max-w-md mx-auto">
              Help reunite someone with their belongings by reporting the item you found.
            </p>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-secondary" />
                  Item Details
                </CardTitle>
                <CardDescription>
                  Provide details about the item you found
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Item Name */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground flex items-center gap-2">
                      <Tag className="w-4 h-4 text-secondary" />
                      Item Name
                    </label>
                    <Input
                      name="itemName"
                      value={formData.itemName}
                      onChange={handleInputChange}
                      placeholder="e.g., Student ID Card, Blue Backpack"
                      required
                    />
                  </div>

                  {/* Category */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground flex items-center gap-2">
                      <FileText className="w-4 h-4 text-secondary" />
                      Category
                    </label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      className="flex h-11 w-full rounded-xl border border-border bg-card/60 backdrop-blur-sm px-4 py-2 text-sm text-foreground ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:border-primary/50 transition-all duration-300 hover:border-primary/30"
                      required
                    >
                      <option value="">Select a category</option>
                      {categories.map((cat) => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Description */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground flex items-center gap-2">
                      <FileText className="w-4 h-4 text-secondary" />
                      Description
                    </label>
                    <Textarea
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      placeholder="Describe the item (color, brand, condition, etc.)"
                      rows={4}
                      required
                    />
                  </div>

                  {/* Image Upload */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">
                      Item Image (Recommended)
                    </label>
                    <ImageUpload
                      onImageSelect={setImage}
                      currentImage={image ? URL.createObjectURL(image) : null}
                    />
                  </div>

                  {/* Date & Location */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-secondary" />
                        Date Found
                      </label>
                      <Input
                        type="date"
                        name="date"
                        value={formData.date}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-secondary" />
                        Location Found
                      </label>
                      <Input
                        name="location"
                        value={formData.location}
                        onChange={handleInputChange}
                        placeholder="e.g., Cafeteria, Main Entrance"
                        required
                      />
                    </div>
                  </div>

                  {/* Contact */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">
                      Contact Email
                    </label>
                    <Input
                      type="email"
                      name="contact"
                      value={formData.contact}
                      onChange={handleInputChange}
                      placeholder="your.email@campus.edu"
                      required
                    />
                  </div>

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    variant="secondary"
                    size="lg"
                    className="w-full"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-secondary-foreground/30 border-t-secondary-foreground rounded-full animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        Submit Report
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
