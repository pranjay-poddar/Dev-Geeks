/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import org.knowm.xchart.PieChart;
import org.knowm.xchart.PieChartBuilder;
import org.knowm.xchart.XChartPanel;
import org.knowm.xchart.style.Styler;
import org.knowm.xchart.style.Styler.ChartTheme;
public class ExpenditureDistribution  {

  public XChartPanel getPanel() throws SQLException {

    ExpenditureDistribution exampleChart = new ExpenditureDistribution();
    PieChart chart = exampleChart.getChart();
    XChartPanel panel=new XChartPanel(chart);
    return panel;
  }

  public PieChart getChart() throws SQLException {

    // Create Chart
    PieChart chart =
        new PieChartBuilder()
            .width(1366)
            .height(748)
            .title("Expenditure Distribution In 2017")
            .theme(ChartTheme.XChart)
            .build();

    // Customize Chart
    chart.getStyler().setLegendVisible(true);
    chart.getStyler().setAnnotationDistance(1.15);
    chart.getStyler().setPlotContentSize(.7);
    chart.getStyler().setStartAngleInDegrees(90);
    chart.getStyler().setToolTipsEnabled(true);
    chart.getStyler().setToolTipType(Styler.ToolTipType.yLabels);
    ArrayList<Double> a = new ArrayList<Double>(); 
    ArrayList<String> b = new ArrayList<String>();
    // Series
    int i = 0;
    Connection con = DbConnect.getConnection();
    Statement statement = con.createStatement();
    ResultSet resultset = statement.executeQuery("SELECT * FROM expendituredistribution");
    while(resultset.next())
    {
        a.add(Double.parseDouble(resultset.getString("Amount")));
        b.add(resultset.getString("type"));
        chart.addSeries(b.get(i),a.get(i));
        i++;
    }
    return chart;
  }
}
