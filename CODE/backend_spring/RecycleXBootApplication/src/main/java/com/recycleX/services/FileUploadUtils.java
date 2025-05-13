package com.recycleX.services;

import java.io.File;
import java.io.IOException;
import java.util.UUID;
import org.springframework.web.multipart.MultipartFile;

public class FileUploadUtils {

	public static String saveImage(MultipartFile image, String relativePath) throws IOException {
		// Base upload directory: projectRoot/supplierUploads/
		String baseUploadDir = System.getProperty("user.dir") + File.separator + "supplierUploads" + File.separator;
		String fullPath = baseUploadDir + relativePath;

		// Ensure directory exists
		File directory = new File(fullPath);
		if (!directory.exists()) {
			directory.mkdirs();
		}

		// Generate unique filename to avoid conflicts
		String originalFileName = image.getOriginalFilename();
		String uniqueFileName = UUID.randomUUID().toString() + "_" + originalFileName;

		// Save the file
		File fileToSave = new File(fullPath + File.separator + uniqueFileName);
		image.transferTo(fileToSave);

		return uniqueFileName; // Only return file name for DB storage
	}
}
