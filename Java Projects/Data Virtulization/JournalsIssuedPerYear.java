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


public class JournalsIssuedPerYear implements ExampleChart<CategoryChart> {
 
  public XChartPanel getPanel() throws IOException {
 
    ExampleChart<CategoryChart> exampleChart = new JournalsIssuedPerYear();
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
            title("JOURNALS ISSUED BY LIBRARY EVERY YEAR").
            theme(ChartTheme.Matlab).build();
    // Customize Chart
    chart.getStyler().setChartTitleVisible(true);
    chart.getStyler().setLegendPosition(LegendPosition.OutsideS);
    chart.getStyler().setDefaultSeriesRenderStyle(CategorySeriesRenderStyle.Stick);
    chart.getStyler().setPlotGridLinesColor(new Color(255, 255, 255));
    chart.getStyler().setChartFontColor(Color.BLACK);
    chart.getStyler().setToolTipsEnabled(true);
    chart.getStyler().setToolTipType(Styler.ToolTipType.yLabels);
    // Series
    List<Integer> xData = new ArrayList<>();
    List<Integer> yData = new ArrayList<>();
    try {
                Statement statement = con.createStatement();
                ResultSet resultSet = statement.executeQuery("SELECT * FROM nationaljournal");
                int i = 0;
                while (resultSet.next()) 
                {
                    xData.add(i,Integer.parseInt(resultSet.getString("YEAR")));
                    yData.add(i,Integer.parseInt(resultSet.getString("NUMBER")));
                }
            } 
    catch (NumberFormatException | SQLException e) 
    {
                System.out.println(e);
    }
    chart.addSeries("NUMBER OF JOURNALS IN LIBRARY", xData, yData);
    return chart;
  }
}