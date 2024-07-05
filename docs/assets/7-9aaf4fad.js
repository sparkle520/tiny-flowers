const n=`# AOP \r
\r
\`AOP\` ：\`Aspect Oriented Programming\` (面向切面编程) ，\`OOP\` 是面向对象编程，\`AOP\` 是在 \`OOP\` 基础之上的一种更高级的设计思想.利用AOP可以对业务逻辑的各个部分进行隔离，将公共部分的逻辑抽离出来，动态织入到目标类和目标方法中，从而使得业务逻辑各部分之间的耦合度降低，提高程序的可重用性，同时提高了开发的效率.\r
\r
# AOP 与 OOP 区别 \r
\r
\`OOP\` 注重业务逻辑单元的划分.   \r
\r
\`AOP\` 注重业务处理过程中的某个步骤或阶段.  \r
\r
\`AOP\` 用于处理系统中分布于各个模块的横切关注点，比如日志记录，性能统计，安全控制，权限管理，事务处理，异常处理，资源池管理等.  \r
\r
# spring AOP 概念 \r
\r
**通知 (Advice)** : 定义切面在特定的连接点执行的动作.通知有多种类型，包括前置通知、后置通知、返回通知、异常通知和环绕通知.\r
\r
**连接点 (Join Point)** : 是程序执行过程中能够应用通知的**所有点**. \r
\r
**切点 (Poincut)** : 定义横切关注点应该被织入的位置.切点通常使用表达式来匹配一个或多个连接点.\r
\r
**切面 (Aspect)** : 封装横切关注点的模块.一个切面可以包含**多个通知**和**一个切点**.\r
\r
**织入 (Weaving)** ：即如何将增强添加到目标对象的连接点上，有动态 (运行期生成代理)、静态 (编译期、类加载时期) 两种方式.\r
\r
**引介 (Introduction)** ：引介是一种特殊的增强，它为类添加一些属性和方法.这样，即使一个业务类原本没有实现某个接口，通过AOP的引介功能，我们可以动态地为该业务类添加接口的实现逻辑，让业务类成为这个接口的实现类.\r
  \r
**目标对象 (Target Object)** ：被通知对象，即实际被代理的对象.  \r
\r
**代理 (Proxy)** ：创建的对象，包含了目标对象的所有方法，并在特定的连接点执行通知逻辑.\r
\r
> spring AOP 通过使用**动态代理技术**，在目标对象方法执行时将切面的逻辑织入到目标对象的方法中.这样，我们可以在不修改原始业务代码的情况下，实现横切关注点的统一处理. \r
\r
# spring AOP 通知类型\r
\r
**前置 通知 ( \`@Before\` )** ：在目标方法执行之前执行.  \r
\r
**后置 通知 ( \`@After\` )** ：在目标方法执行之后执行，不管目标方法是否抛出异常.  \r
\r
**返回 通知 ( \`@AfterReturning\` )** ：在目标方法正常返回时执行.  \r
\r
**异常 通知 ( \`@AfterThrowing\` )** ：在目标方法抛出异常时执行.  \r
\r
**环绕 通知 ( \`@Around\` )** ：在目标方法执行前后都可以执行，它可以完全控制目标方法的执行.  \r
\r
# spring AOP 应用  \r
\r
## AOP 应用场景 \r
\r
### 日志记录 (Logging) ：\r
\r
- 场景：日志记录是应用程序中常见的横切关注点.你可以使用AOP来自动记录方法的入参、出参以及方法的执行时间，以便进行调试和监控.\r
- 实现：通过在切面中定义前置通知 (Before Advice) 来记录方法的入参，返回通知 (After Returning Advice) 来记录方法的出参，以及环绕通知 (Around Advice) 来记录方法的执行时间.这使得日志记录逻辑与业务逻辑分离，提高了代码的可维护性.\r
\r
### 性能监控 (Performance Monitoring) ：\r
\r
- 场景：监控应用程序的性能是关键的，特别是在生产环境中.AOP可以用于捕获方法的执行时间和资源消耗，并将这些信息用于性能分析和优化.\r
- 实现：通过环绕通知 (Around Advice) 来包装方法的执行，记录开始和结束时间，并计算执行时间.这可以帮助你识别性能瓶颈并采取必要的措施.\r
\r
### 安全性 (Security) ：\r
\r
- 场景：安全性是应用程序的一个重要方面.AOP可以用于执行身份验证和授权检查，确保只有授权的用户能够访问某些资源或执行某些操作.\r
- 实现：通过前置通知 (Before Advice) 来执行身份验证和授权检查，以确保用户有权执行特定操作.如果检查失败，可以抛出异常或采取其他必要的措施来保护应用程序的安全性.\r
### 事务管理 (Transaction Management) ：\r
\r
- 场景：在数据库操作中，事务管理是至关重要的.AOP可以用于自动管理事务的开启、提交和回滚，以确保数据的一致性和完整性.\r
- 实现：通过环绕通知 (Around Advice) 来包装事务性方法，开始事务、提交或回滚事务，以确保在方法执行期间的数据操作是原子性的.\r
\r
### 异常处理 (Exception Handling) ：\r
\r
- 场景：处理异常情况是应用程序开发中的常见任务.AOP可以用于捕获和处理方法中的异常，以提供更好的用户体验和错误报告. \r
- 实现：通过异常通知 (After Throwing Advice) 来捕获方法中抛出的异常，并根据需要执行处理逻辑，例如记录异常信息、发送警报或提供友好的错误消息.\r
\r
### 缓存 (Caching) ：\r
\r
- 场景：应用程序的性能可以通过缓存提高.AOP可以用于自动缓存方法的结果，以减少对底层资源的访问.\r
- 实现：通过环绕通知 (Around Advice) 来检查缓存中是否存在方法的结果，如果存在则返回缓存的值，否则执行方法并将结果存入缓存.\r
这些是Spring Boot AOP的一些常见应用场景，但并不局限于此.AOP的强大之处在于它可以用于处理各种横切关注点，从而提高代码的模块化性和可维护性，同时降低重复代码的数量.这些应用场景有助于改善应用程序的质量、性能和安全性.\r
\r
## 引入依赖  \r
\r
\`\`\` xml  \r
<dependency>\r
    <groupId>org.springframework.boot</groupId>\r
    <artifactId>spring-boot-starter-aop</artifactId>\r
    <version>2.1.6.RELEASE</version>\r
</dependency>  \r
\`\`\`  \r
\r
## 创建切面类 (Aspect Class)  \r
\r
在类上使用 \`@Component\` 注解(交给IoC容器管理)  \r
\r
在类上使用 \`@Aspect\` 注解 使之成为切面类  \r
\r
### 切点表达式 (Pointcut Expression)\r
\r
切点表达式是 AOP 中的一个关键概念，它允许你精确地选择要拦截的方法，以便将特定的横切关注点应用于特定的代码路径.\r
\r
**表达式主体** ：表达式主体定义了要匹配的方法或类的特征\r
\r
- 方法访问修饰符 ：如 \`public\` 、\`protected\` 、\`private\` 等. \r
\r
- 返回类型 ：方法的返回类型，例如 \`void\`、\`String\` 等. \r
\r
- 包名和类名 ：方法所属的包和类. \r
\r
- 方法名：方法的名称 ，可以使用通配符来匹配多个方法. \r
\r
- 方法参数列表 ：方法的参数类型和数量.  \r
\r
**切点关键字** ：切点关键字用于指定要匹配的连接点的类型.  \r
\r
- execution ：匹配方法执行的连接点.  \r
\r
- within ：匹配特定包或类内部的所有连接点.  \r
\r
- this ：匹配指定类型的代理对象.  \r
\r
- target ：匹配指定类型的目标对象.  \r
\r
- args ：匹配方法参数类型匹配给定参数类型的连接点.\r
\r
**[例]** \r
\r
\`\`\` java\r
@Pointcut("execution(* com.service.*.*(..))") \r
\`\`\`\r
\r
### JoinPoint 和 ProceedingJoinPoint 使用详解\r
\r
#### JoinPoint  \r
\r
\`\`\` java\r
//返回目标对象，即被代理的对象\r
Object getTarget();\r
\r
//返回切入点的参数\r
Object[] getArgs();\r
\r
//返回切入点的Signature\r
Signature getSignature();\r
\r
//返回切入的类型，比如method-call，field-get等等\r
String getKind();\r
\`\`\` \r
\r
#### ProceedingJoinPoint \r
\r
\`Proceedingjoinpoint\` 继承了 \`JoinPoint\`.是在 \`JoinPoint\` 的基础上暴露出 \`proceed\` 这个方法. \`proceed\` 很重要，这个是 aop 代理链执行的方法.\r
\r
## 创建目标类 (Target  Class)  \r
\r
在类上添加 \`@Component\` 注解(交给IoC容器管理)\r
\r
## 主配置类 (Application  Class)  \r
\r
在类上添加 \`@EnableAspectJAutoProxy\`.\r
`;export{n as default};
