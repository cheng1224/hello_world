package com.convertlab;

import com.convertlab.beans.funnel.EachStep;
import com.convertlab.beans.funnel.FunnelQuery;
import com.convertlab.funnel.FunnelQueryGenerator;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

@RunWith(SpringRunner.class)
@SpringBootTest
public class AdsApplicationTests {

	@Test
	public void contextLoads() {
	}

	@Test
	public void funnelQueryTest(){

		EachStep step = new EachStep();
		Filter filter1 = new Filter();

		filter1.setCategory("event.page");
		filter1.setProperty("open_page");
		Parameter p1 = new Parameter();
		p1.setOperator("any");
		filter1.setParameter(p1);
		Filters fs1 = new Filters();
		fs1.setLogicalOperator("and");
		fs1.setVersion("2.0");
		FilterGroup fg = new FilterGroup();
		fg.setLogicalOperator("and");
		fg.setConditions(new Filter[] {filter1});
		fs1.setSubFilters(new FilterGroup[]{fg});
		step.setFilters(fs1);
		step.setStepName("打开页面");

		EachStep step2 = new EachStep();
		Filter filter2 = new Filter();
		filter2.setCategory("event.page");
		filter2.setProperty("submit_form");
		Parameter p2 = new Parameter();
		p2.setOperator("any");
		filter2.setParameter(p2);
		Filters fs2 = new Filters();
		fs2.setLogicalOperator("and");
		fs2.setVersion("2.0");
		FilterGroup fg2 = new FilterGroup();
		fg2.setLogicalOperator("and");
		fg2.setConditions(new Filter[] {filter2});
		fs2.setSubFilters(new FilterGroup[]{fg2});
		step2.setFilters(fs2);
		step2.setStepName("提交表单");

		EachStep step3 = new EachStep();
		Filter filter3 = new Filter();
		filter3.setCategory("event.wechat");
		filter3.setProperty("subscribe");
		Parameter p3 = new Parameter();
		p3.setOperator("any");
		filter3.setParameter(p3);
		Filters fs3 = new Filters();
		fs3.setLogicalOperator("and");
		fs3.setVersion("2.0");
		FilterGroup fg3 = new FilterGroup();
		fg3.setLogicalOperator("and");
		fg3.setConditions(new Filter[] {filter3});
		fs3.setSubFilters(new FilterGroup[]{fg3});
		step3.setFilters(fs3);
		step3.setStepName("注册");

		EachStep step4 = new EachStep();
		Filter filter4 = new Filter();
		filter4.setCategory("event.wechat");
		filter4.setProperty("wechat_leave_message");
		Parameter p4 = new Parameter();
		p4.setOperator("any");
		filter4.setParameter(p4);
		Filters fs4 = new Filters();
		fs4.setLogicalOperator("and");
		fs4.setVersion("2.0");
		FilterGroup fg4 = new FilterGroup();
		fg4.setLogicalOperator("and");
		fg4.setConditions(new Filter[] {filter4});
		fs4.setSubFilters(new FilterGroup[]{fg4});
		step4.setFilters(fs4);
		step4.setStepName("微信留言");

		EachStep[] steps = new EachStep[4];
		steps[0] = step;
		steps[1] = step2;
		steps[2] = step3;
		steps[3] = step4;

		FunnelQuery query = new FunnelQuery();
		query.setSteps(steps);

		FunnelQueryGenerator funnelQueryGenerator = new FunnelQueryGenerator();
		System.out.println(funnelQueryGenerator.generateQuery(query, 0));
		System.out.println("test finish");
	}

}
