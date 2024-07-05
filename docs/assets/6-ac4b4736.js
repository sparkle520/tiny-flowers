const n=`# JSR\r
\r
JSR是Java Specification Requests的缩写，意思是Java 规范提案.是指向JCP(Java Community Process)提出新增一个标准化技术规范的正式请求.任何人都可以提交JSR，以向Java平台增添新的API和服务.JSR已成为Java界的一个重要标准.\r
\r
# JSR-303  \r
\r
JSR-303是JAVA EE 6 中的一项子规范，叫做Bean Validation，Hibernate Validator 是 Bean Validation 的参考实现. Hibernate Validator 提供了 JSR 303 规范中所有内置 constraint 的实现，除此之外还有一些附加的 constraint.\r
\r
# 引入依赖  \r
\r
\`\`\` xml  \r
<!-- JSR303依赖 -->\r
<dependency>\r
   <groupId>org.springframework.boot</groupId>\r
   <artifactId>spring-boot-starter-validation</artifactId>\r
</dependency>\r
\`\`\` \r
\r
# JSR303检验\r
\r
\`\`\` java  \r
空检查 \r
@Null 验证对象是否为null \r
@NotNull 验证对象是否不为null, 无法查检长度为0的字符串 \r
@NotBlank 检查约束字符串是不是Null还有被Trim的长度是否大于0,只对字符串,且会去掉前后空格. \r
@NotEmpty 检查约束元素是否为NULL或者是EMPTY.\r
\r
Booelan检查 \r
@AssertTrue 验证 Boolean 对象是否为 true \r
@AssertFalse 验证 Boolean 对象是否为 false\r
\r
长度检查 \r
@Size(min=, max=) 验证对象（Array,Collection,Map,String）长度是否在给定的范围之内 \r
@Length(min=, max=) Validates that the annotated string is between min and max included.\r
\r
日期检查 \r
@Past 验证 Date 和 Calendar 对象是否在当前时间之前，验证成立的话被注释的元素一定是一个过去的日期 \r
@Future 验证 Date 和 Calendar 对象是否在当前时间之后 ，验证成立的话被注释的元素一定是一个将来的日期 \r
@Pattern 验证 String 对象是否符合正则表达式的规则，被注释的元素符合制定的正则表达式，regexp:正则表达式 flags: 指定 Pattern.Flag 的数组，表示正则表达式的相关选项.\r
\r
数值检查 \r
建议使用在Stirng,Integer类型，不建议使用在int类型上，因为表单值为“”时无法转换为int，但可以转换为Stirng为”“,Integer为null \r
@Min 验证 Number 和 String 对象是否大等于指定的值 \r
@Max 验证 Number 和 String 对象是否小等于指定的值 \r
@DecimalMax 被标注的值必须不大于约束中指定的最大值. 这个约束的参数是一个通过BigDecimal定义的最大值的字符串表示.小数存在精度 \r
@DecimalMin 被标注的值必须不小于约束中指定的最小值. 这个约束的参数是一个通过BigDecimal定义的最小值的字符串表示.小数存在精度 \r
@Digits 验证 Number 和 String 的构成是否合法 \r
@Digits(integer=,fraction=) 验证字符串是否是符合指定格式的数字，interger指定整数精度，fraction指定小数精度. \r
@Range(min=, max=) 被指定的元素必须在合适的范围内 \r
@Range(min=10000,max=50000,message=”range.bean.wage”) \r
@Valid 递归的对关联对象进行校验, 如果关联对象是个集合或者数组,那么对其中的元素进行递归校验,如果是一个map,则对其中的值部分进行校验.(是否进行递归验证) \r
@CreditCardNumber 信用卡验证 \r
@Email 验证是否是邮件地址，如果为null,不进行验证，算通过验证. \r
@ScriptAssert(lang= ,script=, alias=) 脚本验证(自定义)\r
@URL(protocol=,host=, port=,regexp=, flags=)\r
\`\`\`\r
`;export{n as default};
