/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
import java.awt.Color;
import java.io.IOException;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;
import org.knowm.xchart.CategoryChart;
import org.knowm.xchart.CategoryChartBuilder;
import org.knowm.xchart.CategorySeries.CategorySeriesRenderStyle;
import org.knowm.xchart.XChartPanel;
import org.knowm.xchart.demo.charts.ExampleChart;
import org.knowm.xchart.style.Styler;
import org.knowm.xchart.style.Styler.ChartTheme;
import org.knowm.xchart.style.Styler.LegendPosition;


public class ExpenditureOnBook implements ExampleChart<CategoryChart> {
 
  public XChartPanel getPanel() throws IOException {
 
    ExampleChart<CategoryChart> exampleChart = new ExpenditureOnBook();
    CategoryChart chart = exampleChart.getChart();
    XChartPanel panel=new XChartPanel(chart);
    return panel;
  }
 
  @Override
  public CategoryChart getChart() {
    Connection con = DbConnect.getConnection();
    // Create Chart
    CategoryChart chart = new CategoryChartBuilder()
            .width(1366).height(748).
            title("EXPENDITURE ON BOOKS EVERY YEAR").
            theme(ChartTheme.GGPlot2).build();
    // Customize Chart
    chart.getStyler().setChartTitleVisible(true);
    chart.getStyler().setLegendPosition(LegendPosition.OutsideS);
    chart.getStyler().setDefaultSeriesRenderStyle(CategorySeriesRenderStyle.Stick);
    chart.getStyler().setPlotGridLinesColor(new Color(255, 255, 255));
    chart.getStyler().setChartFontColor(Color.BLACK);
    chart.getStyler().setToolTipsEnabled(true);
    chart.getStyler().setPlotGridLinesVisible(false);
    chart.getStyler().setToolTipType(Styler.ToolTipType.yLabels);
    chart.getStyler().setXAxisLabelRotation(45);
    // Series
    List<String> xData = new ArrayList<String>();
    List<Double> yData = new ArrayList<Double>();
    try {
                Statement statement = con.createStatement();
                ResultSet resultSet = statement.executeQuery("SELECT * FROM expenditureonbooks");
                int i = 0;
                while (resultSet.next()) 
                {
                    xData.add(i,resultSet.getString("year"));
                    yData.add(i,Double.parseDouble(resultSet.getString("amount")));
                }
            } 
    catch (NumberFormatException | SQLException e) 
    {
                System.out.println(e);
    }
    chart.addSeries("EXPENDITURE ON BOOKS", xData, yData);
    return chart;
  }
}