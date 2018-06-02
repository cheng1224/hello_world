package com.convertlab;

import org.joda.time.DateTimeZone;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

import java.util.TimeZone;

@SpringBootApplication
public class AdsApplication {

	public static void main(String[] args) {
		DateTimeZone.setDefault(DateTimeZone.UTC);
		TimeZone.setDefault(TimeZone.getTimeZone("UTC"));
		SpringApplication.run(AdsApplication.class, args);
	}
}
