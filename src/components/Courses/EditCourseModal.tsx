"use client";

import React, { useEffect, useState, useRef } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { useUpdateCourseApi } from "@/hooks/courseApi";
import { useTheme } from "@/theme/ThemeProvider";
import { themeColors } from "@/theme/themeConfig";
import { Loader2, Upload, ImageIcon, X, Save, Edit3 } from "lucide-react";
import { toast } from "sonner";

interface EditCourseModalProps {
  course: any | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const EditCourseModal: React.FC<EditCourseModalProps> = ({
  course,
  open,
  onOpenChange,
}) => {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const c = themeColors;

  const { mutateAsync: updateCourse, isPending } = useUpdateCourseApi();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState({
    course_name: "",
    price: "",
    duration: "",
    category_id: "",
    lesson: "",
    description: "",
  });

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>("");

  useEffect(() => {
    if (course && open) {
      setFormData({
        course_name: course.course_name || "",
        price: course.price !== undefined && course.price !== null ? String(course.price) : "",
        duration: course.duration !== undefined && course.duration !== null ? String(course.duration) : "",
        category_id: course.category_id !== undefined && course.category_id !== null ? String(course.category_id) : "",
        lesson: course.lesson !== undefined && course.lesson !== null ? String(course.lesson) : (course.lessons ? String(course.lessons) : ""),
        description: course.description || "",
      });
      setImageFile(null);
      setPreviewUrl(course.image || "");
    }
  }, [course, open]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error("Image size should be less than 5MB");
        return;
      }
      setImageFile(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const handleRemoveNewImage = () => {
    setImageFile(null);
    setPreviewUrl(course?.image || "");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!course?.id) return;

    if (!formData.course_name.trim()) {
      toast.error("Course name is required");
      return;
    }
    if (!formData.price) {
      toast.error("Price is required");
      return;
    }

    try {
      const fd = new FormData();
      fd.append("course_name", formData.course_name.trim());
      fd.append("price", formData.price);
      if (formData.duration) fd.append("duration", formData.duration);
      if (formData.category_id) fd.append("category_id", formData.category_id.trim());
      if (formData.lesson) fd.append("lesson", formData.lesson);
      if (formData.description) fd.append("description", formData.description.trim());

      if (imageFile) {
        fd.append("image", imageFile);
      }

      await updateCourse({ id: course.id, data: fd });
      toast.success("Course updated successfully!");
      onOpenChange(false);
    } catch (err: any) {
      console.error("Course update failed:", err);
      toast.error(err?.response?.data?.error || err?.message || "Failed to update course");
    }
  };

  const primaryAccent = isDark ? c.primary.dark : c.primary.light;

  const inputStyle: React.CSSProperties = {
    width: "100%",
    height: "2.65rem",
    borderRadius: "0.75rem",
    backgroundColor: isDark ? c.backgroundSecondary.dark : c.backgroundSecondary.light,
    border: `1px solid ${isDark ? c.border.dark : c.border.light}`,
    color: isDark ? c.text.dark : c.text.light,
    padding: "0 0.9rem",
    fontSize: "0.875rem",
    outline: "none",
    transition: "border-color 0.2s ease",
  };

  const labelStyle: React.CSSProperties = {
    display: "block",
    fontSize: "0.72rem",
    fontWeight: "700",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
    color: isDark ? c.textSecondary.dark : c.textSecondary.light,
    marginBottom: "0.35rem",
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        style={{
          maxWidth: "640px",
          width: "95vw",
          maxHeight: "90vh",
          overflowY: "auto",
          backgroundColor: isDark ? c.card.dark : c.card.light,
          border: `1px solid ${isDark ? c.border.dark : c.border.light}`,
          borderRadius: "1.5rem",
          padding: "2rem",
          color: isDark ? c.text.dark : c.text.light,
          boxShadow: isDark ? "0 25px 50px rgba(0,0,0,0.6)" : "0 25px 50px rgba(0,0,0,0.15)",
        }}
      >
        <DialogHeader style={{ marginBottom: "1.25rem" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "0.5rem" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
              <div
                style={{
                  width: "36px",
                  height: "36px",
                  borderRadius: "10px",
                  backgroundColor: `${primaryAccent}22`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: primaryAccent,
                }}
              >
                <Edit3 size={18} />
              </div>
              <DialogTitle style={{ fontSize: "1.35rem", fontWeight: "900", margin: 0 }}>
                Edit Course
              </DialogTitle>
            </div>
            {course?.id && (
              <span
                style={{
                  fontSize: "0.7rem",
                  fontWeight: "800",
                  padding: "4px 10px",
                  borderRadius: "999px",
                  backgroundColor: isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.06)",
                  color: isDark ? c.textSecondary.dark : c.textSecondary.light,
                }}
              >
                ID: #{course.id}
              </span>
            )}
          </div>
          <DialogDescription style={{ color: isDark ? c.textSecondary.dark : c.textSecondary.light, fontSize: "0.82rem", marginTop: "4px" }}>
            Update all course details including image, name, pricing, SAC code, and description.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.1rem" }}>
          {/* Image Upload & Preview Section */}
          <div>
            <label style={labelStyle}>Course Banner Image</label>
            <div
              style={{
                display: "flex",
                gap: "1rem",
                alignItems: "center",
                padding: "0.85rem",
                borderRadius: "1rem",
                backgroundColor: isDark ? c.backgroundSecondary.dark : c.backgroundSecondary.light,
                border: `1px dashed ${isDark ? c.border.dark : c.border.light}`,
              }}
            >
              {previewUrl ? (
                <div style={{ position: "relative", width: "120px", height: "70px", borderRadius: "8px", overflow: "hidden", flexShrink: 0 }}>
                  <img
                    src={previewUrl}
                    alt="Preview"
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                  {imageFile && (
                    <button
                      type="button"
                      onClick={handleRemoveNewImage}
                      title="Reset image"
                      style={{
                        position: "absolute",
                        top: 4,
                        right: 4,
                        backgroundColor: "rgba(0,0,0,0.7)",
                        color: "#fff",
                        border: "none",
                        borderRadius: "50%",
                        width: "20px",
                        height: "20px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        cursor: "pointer",
                      }}
                    >
                      <X size={12} />
                    </button>
                  )}
                </div>
              ) : (
                <div
                  style={{
                    width: "120px",
                    height: "70px",
                    borderRadius: "8px",
                    backgroundColor: isDark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.04)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: isDark ? c.textSecondary.dark : c.textSecondary.light,
                    flexShrink: 0,
                  }}
                >
                  <ImageIcon size={24} opacity={0.6} />
                </div>
              )}

              <div style={{ flex: 1, minWidth: 0 }}>
                <input
                  type="file"
                  ref={fileInputRef}
                  accept="image/*"
                  onChange={handleImageChange}
                  style={{ display: "none" }}
                  id="course-image-file-input"
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.4rem",
                    padding: "0.5rem 0.9rem",
                    borderRadius: "0.6rem",
                    border: `1px solid ${primaryAccent}`,
                    background: "transparent",
                    color: primaryAccent,
                    fontSize: "0.78rem",
                    fontWeight: "700",
                    cursor: "pointer",
                  }}
                >
                  <Upload size={14} />
                  {imageFile ? "Change Image" : "Upload New Image"}
                </button>
                <p style={{ margin: "4px 0 0", fontSize: "0.72rem", color: isDark ? c.textSecondary.dark : c.textSecondary.light }}>
                  {imageFile ? `Selected: ${imageFile.name}` : "JPG, PNG, WebP up to 5MB. Leave unchanged to keep current."}
                </p>
              </div>
            </div>
          </div>

          {/* Grid fields */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "1rem" }}>
            <div>
              <label style={labelStyle}>Course Name *</label>
              <input
                type="text"
                name="course_name"
                value={formData.course_name}
                onChange={handleInputChange}
                placeholder="e.g. Personal Development"
                required
                style={inputStyle}
              />
            </div>

            <div>
              <label style={labelStyle}>Price (₹) *</label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                placeholder="e.g. 749"
                required
                min="0"
                style={inputStyle}
              />
            </div>

            <div>
              <label style={labelStyle}>Duration (Weeks)</label>
              <input
                type="number"
                name="duration"
                value={formData.duration}
                onChange={handleInputChange}
                placeholder="e.g. 12"
                min="1"
                style={inputStyle}
              />
            </div>

            <div>
              <label style={labelStyle}>SAC Code / Category ID</label>
              <input
                type="text"
                name="category_id"
                value={formData.category_id}
                onChange={handleInputChange}
                placeholder="e.g. 999293 or 998319"
                style={inputStyle}
              />
            </div>

            <div>
              <label style={labelStyle}>Lessons Count</label>
              <input
                type="number"
                name="lesson"
                value={formData.lesson}
                onChange={handleInputChange}
                placeholder="e.g. 24"
                min="0"
                style={inputStyle}
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label style={labelStyle}>Course Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows={4}
              placeholder="Detailed description of what students will learn..."
              style={{
                ...inputStyle,
                height: "90px",
                padding: "0.65rem 0.9rem",
                resize: "vertical",
                fontFamily: "inherit",
              }}
            />
          </div>

          {/* Footer Actions */}
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              gap: "0.75rem",
              marginTop: "0.5rem",
              paddingTop: "1rem",
              borderTop: `1px solid ${isDark ? c.border.dark : c.border.light}`,
            }}
          >
            <button
              type="button"
              onClick={() => onOpenChange(false)}
              disabled={isPending}
              style={{
                padding: "0.65rem 1.3rem",
                borderRadius: "0.75rem",
                border: `1px solid ${isDark ? c.border.dark : c.border.light}`,
                backgroundColor: "transparent",
                color: isDark ? c.text.dark : c.text.light,
                fontWeight: "600",
                fontSize: "0.85rem",
                cursor: isPending ? "not-allowed" : "pointer",
              }}
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isPending}
              style={{
                padding: "0.65rem 1.6rem",
                borderRadius: "0.75rem",
                border: "none",
                backgroundColor: primaryAccent,
                color: isDark ? "#000000" : "#ffffff",
                fontWeight: "800",
                fontSize: "0.85rem",
                cursor: isPending ? "not-allowed" : "pointer",
                display: "inline-flex",
                alignItems: "center",
                gap: "0.4rem",
                opacity: isPending ? 0.7 : 1,
                boxShadow: `0 4px 14px ${primaryAccent}44`,
              }}
            >
              {isPending ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  Updating...
                </>
              ) : (
                <>
                  <Save size={16} />
                  Save Changes
                </>
              )}
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditCourseModal;
