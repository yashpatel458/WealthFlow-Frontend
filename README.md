# WealthFlow Test Automation Project

Credentials:
admin
password123


https://github.com/user-attachments/assets/4bd816f0-8ca8-4d94-9b8b-1d171a0af2c9



This repository contains the automated test scripts and configurations for the **WealthFlow** application, a web-based frontend hosted on [GitHub Pages](https://yashpatel458.github.io/WealthFlow-Frontend/login.html). The project uses **Selenium** for UI automation, integrates with **Cucumber** for Behavior-Driven Development (BDD), and leverages **JUnit** and **Maven** for test execution and dependency management. Future enhancements include **JMeter** for performance testing and **Jenkins** for CI/CD.

---

## **Frontend Overview**

The **WealthFlow** application is a financial management web app built using HTML, CSS, and JavaScript.

- **Testing Repository**: [WealthFlow Testing GitHub Repo](https://github.com/yashpatel458/WealthFlow-Testing)
- **Hosted Application**: [WealthFlow Application](https://yashpatel458.github.io/WealthFlow-Frontend/login.html)

Credentials: admin | password123


### **Frontend Features**
1. Login page for user authentication.
2. Dashboard displaying financial metrics and charts.
3. Analytics page with search and export functionality.
4. Currency converter for live conversions.
5. Product and news pages with filtering and detailed information.

---

## **What Has Been Done So Far**

### **1. Selenium for UI Automation**
- Selenium WebDriver is used to interact with the WealthFlow frontend.
- Automated browser actions include:
  - Navigating through pages (login, dashboard, analytics, etc.).
  - Entering data (e.g., login credentials).
  - Validating page content (e.g., metrics, dropdowns, and table data).
  - Clicking buttons and verifying navigation.

### **2. Cucumber for BDD**
- **Behavior-Driven Development (BDD)** framework implemented using Cucumber.
- **Gherkin Syntax**: Feature files are written in plain English to define user behavior scenarios.
  - Example feature file:
    ```gherkin
    Feature: WealthFlow Application

      Scenario: Login and validate dashboard
        Given the user is on the login page
        When the user logs in with valid credentials
        Then the dashboard page is displayed

      Scenario: Navigate to the analytics page and validate functionality
        Given the user is on the dashboard page
        When the user navigates to the analytics page
        Then the analytics page is displayed
    ```

- **Step Definitions**: Java methods are mapped to Gherkin steps, leveraging Selenium for browser automation.

### **3. JUnit Integration**
- **JUnit** is used as the test runner for executing Cucumber scenarios.
- JUnit generates structured test reports and integrates seamlessly with Maven for builds.
- The `@RunWith` annotation links Cucumber with JUnit for execution:
    ```java
    @RunWith(Cucumber.class)
    @CucumberOptions(
        features = "src/test/resources/features",
        glue = "com.selenium.steps",
        plugin = {"pretty", "html:target/cucumber-reports.html"},
        monochrome = true
    )
    public class CucumberRunner {}
    ```

### **4. Maven for Dependency Management**
- All dependencies are managed using Maven.
- Key dependencies include:
  - **Selenium WebDriver**: For browser automation.
  - **Cucumber**: For BDD integration.
  - **JUnit**: For test execution.
  - **SLF4J**: For logging.
- The `pom.xml` file is configured as follows:
  ```xml
  <dependencies>
      <!-- Selenium -->
      <dependency>
          <groupId>org.seleniumhq.selenium</groupId>
          <artifactId>selenium-java</artifactId>
          <version>4.9.0</version>
      </dependency>

      <!-- Cucumber -->
      <dependency>
          <groupId>io.cucumber</groupId>
          <artifactId>cucumber-java</artifactId>
          <version>7.13.0</version>
      </dependency>
      <dependency>
          <groupId>io.cucumber</groupId>
          <artifactId>cucumber-junit</artifactId>
          <version>7.13.0</version>
      </dependency>

      <!-- JUnit -->
      <dependency>
          <groupId>org.junit.jupiter</groupId>
          <artifactId>junit-jupiter</artifactId>
          <version>5.9.3</version>
      </dependency>

      <!-- Logging -->
      <dependency>
          <groupId>org.slf4j</groupId>
          <artifactId>slf4j-simple</artifactId>
          <version>1.7.36</version>
      </dependency>
  </dependencies>
  ```

---

## **Project Structure**

```
WealthFlow-Test
├── src
│   ├── main
│   │   └── java
│   │       └── com.selenium.tests
│   │           └── FrontendTest.java    # Your standalone Selenium tests
│   ├── test
│       ├── java
│       │   ├── com.selenium.runner
│       │   │   └── CucumberRunner.java  # Cucumber test runner
│       │   ├── com.selenium.steps
│       │   │   └── WealthFlowSteps.java # Step definitions for Cucumber
│       ├── resources
│           └── features
│               └── wealthflow.feature   # Cucumber feature file
├── pom.xml
├── README.md
```


---

## **How to Run the Tests**

### **1. Prerequisites**
- **Java**: JDK 20 or later.
- **Maven**: For dependency management.
- **ChromeDriver**: Ensure the appropriate version is installed.

### **2. Setup**
1. Clone this repository:
   ```bash
   git clone https://github.com/your-repo/WealthFlow-Test.git
   cd WealthFlow-Test
   ```
2. Install dependencies:
   ```bash
   mvn clean install
   ```

### **3. Run Tests**
1. Run all tests using Maven:
   ```bash
   mvn test
   ```
2. Or run the `CucumberRunner` class directly in IntelliJ IDEA.

### **4. View Results**
- Test results will be displayed in the console.
- An HTML report will be generated in `target/cucumber-reports.html`.

---

## **Upcoming Features**

### **1. JMeter Integration**
- **Purpose**: Validate the performance of the WealthFlow application under concurrent user load.
- **Scenario**: Simulate 100 users logging in simultaneously and verify system stability.
- **Implementation**:
  - Create a JMeter Test Plan to simulate user behavior.
  - Automate JMeter execution via CLI in the CI/CD pipeline.

### **2. Jenkins Integration**
- **Purpose**: Implement Continuous Integration and Continuous Deployment (CI/CD) for automated test execution.
- **Plan**:
  - Configure a Jenkins pipeline to:
    - Pull the latest code from GitHub.
    - Run Selenium and Cucumber tests.
    - Execute JMeter performance tests.
  - Use Docker for containerized builds (if necessary).

---

## **Contributors**
- **[Yash Patel]**: Developer and Tester.

---
