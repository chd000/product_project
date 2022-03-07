FROM openjdk:17-oracle
ARG JAR_FILE=target/*.jar
COPY ${JAR_FILE} product.jar
ENTRYPOINT ["java","-jar","/product.jar"]