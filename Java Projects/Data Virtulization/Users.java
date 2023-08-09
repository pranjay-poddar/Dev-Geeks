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
import org.knowm.xchart.PieChart;
import org.knowm.xchart.PieChartBuilder;
import org.knowm.xchart.XChartPanel;
import org.knowm.xchart.demo.charts.ExampleChart;
import org.knowm.xchart.style.PieStyler.AnnotationType;
import org.knowm.xchart.style.Styler;
import org.knowm.xchart.style.Styler.ChartTheme;
import static org.knowm.xchart.style.Styler.LegendPosition.InsideNW;
public class Users implements ExampleChart<PieChart> {

  public XChartPanel getPanel() throws IOException {

    ExampleChart<PieChart> exampleChart = new Users();
    PieChart chart = exampleChart.getChart();
    XChartPanel panel=new XChartPanel(chart);
    return panel;
  }
  @Override
  public PieChart getChart() {
     Connection con =  DbConnect.getConnection();  
    // Create Chart
    PieChart chart =
        new PieChartBuilder()
            .width(1366)
            .height(748)
            .title("USERS IN THE LIBRARY")
            .theme(ChartTheme.Matlab)
            .build();
    // Customize Chart
    chart.getStyler().setLegendVisible(true);
    chart.getStyler().setAnnotationDistance(1.5);
    chart.getStyler().setPlotContentSize(.7);
    chart.getStyler().setPlotBackgroundColor(new Color(229,229,229));
    chart.getStyler().setCircular(true);
    chart.getStyler().setStartAngleInDegrees(90);
    chart.getStyler().setToolTipsEnabled(true);
    chart.getStyler().setToolTipType(Styler.ToolTipType.xAndYLabels);
    chart.getStyler().setLegendPosition(InsideNW);
    //chart.getStyler().set
    /*Color[] sliceColors =
        new Color[] {
          new Color(127,127,127),
          new Color(229,248,255),
          new Color(25,81,102),
        };*/
  //  chart.getStyler().setSeriesColors(sliceColors);
    chart.getStyler().setAnnotationType(AnnotationType.Value);
    // Series
    ArrayList<String> xData=new ArrayList<>();
    ArrayList<Integer> yData=new ArrayList<>();
    
    try {
                Statement statement = con.createStatement();
                ResultSet resultSet = statement.executeQuery("SELECT * FROM users");
                int i = 0;
                while (resultSet.next()) 
                {
                    xData.add(resultSet.getString("USERS"));
                    yData.add(Integer.parseInt(resultSet.getString("VALUE")));
                    System.out.println(xData.get(i)+yData.get(i).toString());
                    chart.addSeries(xData.get(i),yData.get(i));
                    i++;
                }
            } 
    catch (NumberFormatException | SQLException e) 
    {
                System.out.println(e);
    }
    //chart.addSeries(xData,yData);
    return chart;
  }
}