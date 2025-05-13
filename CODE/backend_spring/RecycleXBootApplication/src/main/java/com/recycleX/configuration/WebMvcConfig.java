package com.recycleX.configuration;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebMvcConfig implements WebMvcConfigurer {

	@Value("${file.supplier-upload-dir}")
	private String supplierUploadDir;

	@Value("${file.consumer-upload-dir}")
	private String consumerUploadDir;

	@Override
	public void addResourceHandlers(ResourceHandlerRegistry registry) {
		String supplierBasePath = "file:" + System.getProperty("user.dir") + "/" + supplierUploadDir + "/";
		String consumerBasePath = "file:" + System.getProperty("user.dir") + "/" + consumerUploadDir + "/";

		// Supplier URLs
		registry.addResourceHandler("/supplier/categories/**")
				.addResourceLocations(supplierBasePath + "categories/");
		registry.addResourceHandler("/supplier/subcategories/**")
				.addResourceLocations(supplierBasePath + "subcategories/");

		// Consumer URLs
		registry.addResourceHandler("/consumer/categories/**")
				.addResourceLocations(consumerBasePath + "categories/");
		registry.addResourceHandler("/consumer/subcategories/**")
				.addResourceLocations(consumerBasePath + "subcategories/");
	}
}
