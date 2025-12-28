package com.mohit44790.admission.service;

import com.mohit44790.admission.entity.StudentProfile;
import org.springframework.stereotype.Service;

import javax.swing.text.Document;
import java.io.FileOutputStream;

@Service
public class PdfService {

    public void generateAdmissionLetter(StudentProfile profile) {

        try {
            Document document = new Document();
            String path = "letters/admission_" + profile.getId() + ".pdf";

            PdfWriter.getInstance(document, new FileOutputStream(path));
            document.open();

            document.add(new Paragraph("🎓 ADMISSION CONFIRMATION"));
            document.add(new Paragraph("Name: " + profile.getFullName()));
            document.add(new Paragraph("Course: " + profile.getCourse().getCourseName()));
            document.add(new Paragraph("College: " + profile.getCourse().getCollege().getCollegeName()));
            document.add(new Paragraph("Status: CONFIRMED"));

            document.close();

        } catch (Exception e) {
            throw new RuntimeException("PDF generation failed");
        }
    }
}

