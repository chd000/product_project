FROM openjdk:17-oracle
ARG JAR_FILE=target/*.jar
COPY ${JAR_FILE} product_app.jar
ENTRYPOINT ["java","-jar","/product_app.jar"]