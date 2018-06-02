package com.convertlab.common;


import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.ImportResource;

@Configuration
@ImportResource(locations={"classpath:application-bean.xml", "classpath:mybatis-config.xml"})
public class Config {
}
