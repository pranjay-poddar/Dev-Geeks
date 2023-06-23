package supermarket;

import java.sql.Statement;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import javax.swing.JOptionPane;
import javax.swing.table.DefaultTableModel;
import net.proteanit.sql.DbUtils;
public class SellerInterface extends javax.swing.JFrame {
    public SellerInterface() {
        initComponents();
        selectFunc();
        getCat();
    }
    Connection con = null;
    Statement st = null;
    ResultSet rs = null;
    public void selectFunc(){
        try{
            con = DriverManager.getConnection("jdbc:mysql://localhost:3306/Supermarket","root","root");
            st = con.createStatement();
            rs = st.executeQuery("Select * from Supermarket.Product");
            prodTable.setModel(DbUtils.resultSetToTableModel(rs));
        } catch(Exception e){
            e.printStackTrace();
        }
    }
    private void getCat(){
        try{
            con = DriverManager.getConnection("jdbc:mysql://localhost:3306/Supermarket","root","root");
            st = con.createStatement();
            String query = "Select * from Supermarket.Category";
            rs = st.executeQuery(query);
            while(rs.next()){
                String myCat = rs.getString("Cat_Name");
                catCb.addItem(myCat);
            }
        } catch(Exception e){
            e.printStackTrace();
        }
    }
    int Pid,newQty;
    public void update(){
        newQty = availQty - Integer.valueOf(prodQty.getText());
        try{
                con = DriverManager.getConnection("jdbc:mysql://localhost:3306/Supermarket","root","root");
                String query = "Update Supermarket.Product set Prod_Qty="+newQty+""+" where Prod_Id="+Pid;
                Statement add = con.createStatement();
                add.executeUpdate(query);
//                JOptionPane.showMessageDialog(this, "Product Updated");
                selectFunc();
            }catch(Exception e){
                e.printStackTrace();
            }
    }
    @SuppressWarnings("unchecked")
    // <editor-fold defaultstate="collapsed" desc="Generated Code">//GEN-BEGIN:initComponents
    private void initComponents() {

        jPanel1 = new javax.swing.JPanel();
        jPanel2 = new javax.swing.JPanel();
        jLabel2 = new javax.swing.JLabel();
        billId = new javax.swing.JTextField();
        jLabel5 = new javax.swing.JLabel();
        prodName = new javax.swing.JTextField();
        jLabel6 = new javax.swing.JLabel();
        prodQty = new javax.swing.JTextField();
        jLabel7 = new javax.swing.JLabel();
        jLabel9 = new javax.swing.JLabel();
        catCb = new javax.swing.JComboBox<>();
        addBtn = new javax.swing.JButton();
        printBtn = new javax.swing.JButton();
        refreshBtn = new javax.swing.JButton();
        jScrollPane1 = new javax.swing.JScrollPane();
        prodTable = new javax.swing.JTable();
        jLabel3 = new javax.swing.JLabel();
        clearBtn = new javax.swing.JButton();
        jScrollPane2 = new javax.swing.JScrollPane();
        billTxt = new javax.swing.JTextArea();
        overallLbl = new javax.swing.JLabel();
        filterBtn = new javax.swing.JButton();
        exitBtn = new javax.swing.JButton();
        logoutBtn = new javax.swing.JButton();

        setDefaultCloseOperation(javax.swing.WindowConstants.EXIT_ON_CLOSE);
        setUndecorated(true);

        jPanel1.setBackground(new java.awt.Color(0, 0, 34));

        jPanel2.setBackground(new java.awt.Color(0, 148, 198));

        jLabel2.setFont(new java.awt.Font("Monospaced", 1, 28)); // NOI18N
        jLabel2.setForeground(new java.awt.Color(255, 255, 255));
        jLabel2.setText("BILL GENERATION DESK");

        billId.setFont(new java.awt.Font("Segoe UI", 1, 14)); // NOI18N
        billId.addActionListener(new java.awt.event.ActionListener() {
            public void actionPerformed(java.awt.event.ActionEvent evt) {
                billIdActionPerformed(evt);
            }
        });

        jLabel5.setBackground(new java.awt.Color(0, 0, 34));
        jLabel5.setFont(new java.awt.Font("Segoe UI", 1, 14)); // NOI18N
        jLabel5.setForeground(new java.awt.Color(255, 255, 255));
        jLabel5.setText("BILL ID");

        prodName.setFont(new java.awt.Font("Segoe UI", 1, 14)); // NOI18N
        prodName.addActionListener(new java.awt.event.ActionListener() {
            public void actionPerformed(java.awt.event.ActionEvent evt) {
                prodNameActionPerformed(evt);
            }
        });

        jLabel6.setBackground(new java.awt.Color(0, 0, 34));
        jLabel6.setFont(new java.awt.Font("Segoe UI", 1, 14)); // NOI18N
        jLabel6.setForeground(new java.awt.Color(255, 255, 255));
        jLabel6.setText("PROD NAME");

        prodQty.setFont(new java.awt.Font("Segoe UI", 1, 14)); // NOI18N
        prodQty.addActionListener(new java.awt.event.ActionListener() {
            public void actionPerformed(java.awt.event.ActionEvent evt) {
                prodQtyActionPerformed(evt);
            }
        });

        jLabel7.setBackground(new java.awt.Color(0, 0, 34));
        jLabel7.setFont(new java.awt.Font("Segoe UI", 1, 14)); // NOI18N
        jLabel7.setForeground(new java.awt.Color(255, 255, 255));
        jLabel7.setText("QUANTITY");

        jLabel9.setBackground(new java.awt.Color(0, 0, 34));
        jLabel9.setFont(new java.awt.Font("Segoe UI", 1, 14)); // NOI18N
        jLabel9.setForeground(new java.awt.Color(255, 255, 255));
        jLabel9.setText("FILTER BY");

        catCb.setFont(new java.awt.Font("Segoe UI", 1, 14)); // NOI18N
        catCb.addItemListener(new java.awt.event.ItemListener() {
            public void itemStateChanged(java.awt.event.ItemEvent evt) {
                catCbItemStateChanged(evt);
            }
        });
        catCb.addActionListener(new java.awt.event.ActionListener() {
            public void actionPerformed(java.awt.event.ActionEvent evt) {
                catCbActionPerformed(evt);
            }
        });

        addBtn.setBackground(new java.awt.Color(0, 0, 34));
        addBtn.setFont(new java.awt.Font("Segoe UI", 1, 14)); // NOI18N
        addBtn.setForeground(new java.awt.Color(255, 255, 255));
        addBtn.setText("ADD");
        addBtn.addActionListener(new java.awt.event.ActionListener() {
            public void actionPerformed(java.awt.event.ActionEvent evt) {
                addBtnActionPerformed(evt);
            }
        });

        printBtn.setBackground(new java.awt.Color(0, 0, 34));
        printBtn.setFont(new java.awt.Font("Segoe UI", 1, 14)); // NOI18N
        printBtn.setForeground(new java.awt.Color(255, 255, 255));
        printBtn.setText("PRINT");
        printBtn.addActionListener(new java.awt.event.ActionListener() {
            public void actionPerformed(java.awt.event.ActionEvent evt) {
                printBtnActionPerformed(evt);
            }
        });

        refreshBtn.setBackground(new java.awt.Color(0, 0, 34));
        refreshBtn.setFont(new java.awt.Font("Segoe UI", 1, 14)); // NOI18N
        refreshBtn.setForeground(new java.awt.Color(255, 255, 255));
        refreshBtn.setText("REFRESH");
        refreshBtn.addActionListener(new java.awt.event.ActionListener() {
            public void actionPerformed(java.awt.event.ActionEvent evt) {
                refreshBtnActionPerformed(evt);
            }
        });

        prodTable.setBackground(new java.awt.Color(0, 0, 34));
        prodTable.setFont(new java.awt.Font("Segoe UI", 1, 14)); // NOI18N
        prodTable.setForeground(new java.awt.Color(255, 255, 255));
        prodTable.setModel(new javax.swing.table.DefaultTableModel(
            new Object [][] {
                {null, null, null, null, null},
                {null, null, null, null, null},
                {null, null, null, null, null},
                {null, null, null, null, null}
            },
            new String [] {
                "PRODUCT ID", "NAME", "QUANTITY", "PRICE", "CATEGORY"
            }
        ));
        prodTable.setRowHeight(25);
        prodTable.setSelectionBackground(new java.awt.Color(0, 148, 198));
        prodTable.setSelectionForeground(new java.awt.Color(255, 255, 255));
        prodTable.addMouseListener(new java.awt.event.MouseAdapter() {
            public void mouseClicked(java.awt.event.MouseEvent evt) {
                prodTableMouseClicked(evt);
            }
        });
        jScrollPane1.setViewportView(prodTable);

        jLabel3.setFont(new java.awt.Font("Monospaced", 3, 18)); // NOI18N
        jLabel3.setForeground(new java.awt.Color(204, 204, 204));
        jLabel3.setText("Products List");

        clearBtn.setBackground(new java.awt.Color(0, 0, 34));
        clearBtn.setFont(new java.awt.Font("Segoe UI", 1, 14)); // NOI18N
        clearBtn.setForeground(new java.awt.Color(255, 255, 255));
        clearBtn.setText("CLEAR");
        clearBtn.addActionListener(new java.awt.event.ActionListener() {
            public void actionPerformed(java.awt.event.ActionEvent evt) {
                clearBtnActionPerformed(evt);
            }
        });

        billTxt.setEditable(false);
        billTxt.setBackground(new java.awt.Color(51, 51, 51));
        billTxt.setColumns(20);
        billTxt.setFont(new java.awt.Font("Segoe UI", 3, 15)); // NOI18N
        billTxt.setForeground(new java.awt.Color(255, 255, 255));
        billTxt.setRows(5);
        jScrollPane2.setViewportView(billTxt);

        overallLbl.setBackground(new java.awt.Color(0, 0, 34));
        overallLbl.setFont(new java.awt.Font("Segoe UI", 1, 36)); // NOI18N
        overallLbl.setForeground(new java.awt.Color(255, 255, 255));
        overallLbl.setText("Rs.");

        filterBtn.setBackground(new java.awt.Color(0, 0, 34));
        filterBtn.setFont(new java.awt.Font("Segoe UI", 1, 14)); // NOI18N
        filterBtn.setForeground(new java.awt.Color(255, 255, 255));
        filterBtn.setText("FILTER");
        filterBtn.addActionListener(new java.awt.event.ActionListener() {
            public void actionPerformed(java.awt.event.ActionEvent evt) {
                filterBtnActionPerformed(evt);
            }
        });

        javax.swing.GroupLayout jPanel2Layout = new javax.swing.GroupLayout(jPanel2);
        jPanel2.setLayout(jPanel2Layout);
        jPanel2Layout.setHorizontalGroup(
            jPanel2Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
            .addGroup(jPanel2Layout.createSequentialGroup()
                .addContainerGap()
                .addGroup(jPanel2Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
                    .addGroup(jPanel2Layout.createSequentialGroup()
                        .addGroup(jPanel2Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING, false)
                            .addGroup(jPanel2Layout.createSequentialGroup()
                                .addGroup(jPanel2Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING, false)
                                    .addComponent(addBtn, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, Short.MAX_VALUE)
                                    .addComponent(jLabel7, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, Short.MAX_VALUE)
                                    .addComponent(jLabel5, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, Short.MAX_VALUE)
                                    .addComponent(jLabel6, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, Short.MAX_VALUE))
                                .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED)
                                .addGroup(jPanel2Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
                                    .addGroup(jPanel2Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING, false)
                                        .addComponent(prodName)
                                        .addComponent(prodQty)
                                        .addComponent(billId, javax.swing.GroupLayout.DEFAULT_SIZE, 180, Short.MAX_VALUE))
                                    .addGroup(jPanel2Layout.createSequentialGroup()
                                        .addComponent(clearBtn, javax.swing.GroupLayout.PREFERRED_SIZE, 87, javax.swing.GroupLayout.PREFERRED_SIZE)
                                        .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED)
                                        .addComponent(printBtn, javax.swing.GroupLayout.PREFERRED_SIZE, 87, javax.swing.GroupLayout.PREFERRED_SIZE))))
                            .addComponent(overallLbl, javax.swing.GroupLayout.DEFAULT_SIZE, 285, Short.MAX_VALUE))
                        .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED)
                        .addGroup(jPanel2Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
                            .addComponent(jScrollPane1, javax.swing.GroupLayout.DEFAULT_SIZE, 588, Short.MAX_VALUE)
                            .addComponent(jScrollPane2))
                        .addContainerGap())
                    .addGroup(javax.swing.GroupLayout.Alignment.TRAILING, jPanel2Layout.createSequentialGroup()
                        .addGap(0, 0, Short.MAX_VALUE)
                        .addGroup(jPanel2Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
                            .addGroup(javax.swing.GroupLayout.Alignment.TRAILING, jPanel2Layout.createSequentialGroup()
                                .addComponent(jLabel2)
                                .addGap(249, 249, 249))
                            .addGroup(javax.swing.GroupLayout.Alignment.TRAILING, jPanel2Layout.createSequentialGroup()
                                .addComponent(jLabel9)
                                .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED)
                                .addComponent(catCb, javax.swing.GroupLayout.PREFERRED_SIZE, 170, javax.swing.GroupLayout.PREFERRED_SIZE)
                                .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED)
                                .addComponent(filterBtn)
                                .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED)
                                .addComponent(refreshBtn)
                                .addGap(85, 85, 85))
                            .addGroup(javax.swing.GroupLayout.Alignment.TRAILING, jPanel2Layout.createSequentialGroup()
                                .addComponent(jLabel3)
                                .addGap(232, 232, 232))))))
        );
        jPanel2Layout.setVerticalGroup(
            jPanel2Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
            .addGroup(jPanel2Layout.createSequentialGroup()
                .addComponent(jLabel2, javax.swing.GroupLayout.PREFERRED_SIZE, 43, javax.swing.GroupLayout.PREFERRED_SIZE)
                .addGap(18, 18, 18)
                .addComponent(jLabel3, javax.swing.GroupLayout.PREFERRED_SIZE, 27, javax.swing.GroupLayout.PREFERRED_SIZE)
                .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED)
                .addGroup(jPanel2Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.BASELINE)
                    .addComponent(catCb, javax.swing.GroupLayout.PREFERRED_SIZE, 35, javax.swing.GroupLayout.PREFERRED_SIZE)
                    .addComponent(jLabel9, javax.swing.GroupLayout.PREFERRED_SIZE, 35, javax.swing.GroupLayout.PREFERRED_SIZE)
                    .addComponent(refreshBtn, javax.swing.GroupLayout.PREFERRED_SIZE, 35, javax.swing.GroupLayout.PREFERRED_SIZE)
                    .addComponent(filterBtn, javax.swing.GroupLayout.PREFERRED_SIZE, 35, javax.swing.GroupLayout.PREFERRED_SIZE))
                .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED)
                .addGroup(jPanel2Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
                    .addGroup(jPanel2Layout.createSequentialGroup()
                        .addGroup(jPanel2Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.BASELINE)
                            .addComponent(billId, javax.swing.GroupLayout.PREFERRED_SIZE, 35, javax.swing.GroupLayout.PREFERRED_SIZE)
                            .addComponent(jLabel5, javax.swing.GroupLayout.PREFERRED_SIZE, 35, javax.swing.GroupLayout.PREFERRED_SIZE))
                        .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.UNRELATED)
                        .addGroup(jPanel2Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.BASELINE)
                            .addComponent(prodName, javax.swing.GroupLayout.PREFERRED_SIZE, 35, javax.swing.GroupLayout.PREFERRED_SIZE)
                            .addComponent(jLabel6, javax.swing.GroupLayout.PREFERRED_SIZE, 35, javax.swing.GroupLayout.PREFERRED_SIZE))
                        .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.UNRELATED)
                        .addGroup(jPanel2Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.BASELINE)
                            .addComponent(prodQty, javax.swing.GroupLayout.PREFERRED_SIZE, 35, javax.swing.GroupLayout.PREFERRED_SIZE)
                            .addComponent(jLabel7, javax.swing.GroupLayout.PREFERRED_SIZE, 35, javax.swing.GroupLayout.PREFERRED_SIZE))
                        .addGap(18, 18, 18)
                        .addGroup(jPanel2Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.BASELINE)
                            .addComponent(addBtn)
                            .addComponent(clearBtn)
                            .addComponent(printBtn)))
                    .addComponent(jScrollPane1, javax.swing.GroupLayout.PREFERRED_SIZE, 220, javax.swing.GroupLayout.PREFERRED_SIZE))
                .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.UNRELATED)
                .addGroup(jPanel2Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
                    .addComponent(jScrollPane2, javax.swing.GroupLayout.DEFAULT_SIZE, 213, Short.MAX_VALUE)
                    .addGroup(jPanel2Layout.createSequentialGroup()
                        .addGap(0, 0, Short.MAX_VALUE)
                        .addComponent(overallLbl, javax.swing.GroupLayout.PREFERRED_SIZE, 68, javax.swing.GroupLayout.PREFERRED_SIZE)))
                .addContainerGap())
        );

        exitBtn.setBackground(new java.awt.Color(153, 0, 0));
        exitBtn.setFont(new java.awt.Font("Segoe UI", 1, 18)); // NOI18N
        exitBtn.setForeground(new java.awt.Color(255, 255, 255));
        exitBtn.setText("X");
        exitBtn.setAlignmentX(0.5F);
        exitBtn.setBorder(null);
        exitBtn.setCursor(new java.awt.Cursor(java.awt.Cursor.DEFAULT_CURSOR));
        exitBtn.addActionListener(new java.awt.event.ActionListener() {
            public void actionPerformed(java.awt.event.ActionEvent evt) {
                exitBtnActionPerformed(evt);
            }
        });

        logoutBtn.setBackground(new java.awt.Color(0, 148, 198));
        logoutBtn.setFont(new java.awt.Font("Monospaced", 1, 20)); // NOI18N
        logoutBtn.setForeground(new java.awt.Color(204, 204, 204));
        logoutBtn.setText("LOGOUT");
        logoutBtn.addActionListener(new java.awt.event.ActionListener() {
            public void actionPerformed(java.awt.event.ActionEvent evt) {
                logoutBtnActionPerformed(evt);
            }
        });

        javax.swing.GroupLayout jPanel1Layout = new javax.swing.GroupLayout(jPanel1);
        jPanel1.setLayout(jPanel1Layout);
        jPanel1Layout.setHorizontalGroup(
            jPanel1Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
            .addGroup(javax.swing.GroupLayout.Alignment.TRAILING, jPanel1Layout.createSequentialGroup()
                .addContainerGap(javax.swing.GroupLayout.DEFAULT_SIZE, Short.MAX_VALUE)
                .addComponent(exitBtn, javax.swing.GroupLayout.PREFERRED_SIZE, 36, javax.swing.GroupLayout.PREFERRED_SIZE)
                .addContainerGap())
            .addGroup(javax.swing.GroupLayout.Alignment.TRAILING, jPanel1Layout.createSequentialGroup()
                .addContainerGap()
                .addComponent(logoutBtn, javax.swing.GroupLayout.PREFERRED_SIZE, 130, javax.swing.GroupLayout.PREFERRED_SIZE)
                .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED)
                .addComponent(jPanel2, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, Short.MAX_VALUE))
        );
        jPanel1Layout.setVerticalGroup(
            jPanel1Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
            .addGroup(javax.swing.GroupLayout.Alignment.TRAILING, jPanel1Layout.createSequentialGroup()
                .addContainerGap()
                .addComponent(exitBtn, javax.swing.GroupLayout.PREFERRED_SIZE, 22, javax.swing.GroupLayout.PREFERRED_SIZE)
                .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED)
                .addGroup(jPanel1Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
                    .addGroup(jPanel1Layout.createSequentialGroup()
                        .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED, javax.swing.GroupLayout.DEFAULT_SIZE, Short.MAX_VALUE)
                        .addComponent(logoutBtn)
                        .addContainerGap())
                    .addComponent(jPanel2, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, Short.MAX_VALUE)))
        );

        javax.swing.GroupLayout layout = new javax.swing.GroupLayout(getContentPane());
        getContentPane().setLayout(layout);
        layout.setHorizontalGroup(
            layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
            .addComponent(jPanel1, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, Short.MAX_VALUE)
        );
        layout.setVerticalGroup(
            layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
            .addComponent(jPanel1, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, Short.MAX_VALUE)
        );

        pack();
        setLocationRelativeTo(null);
    }// </editor-fold>//GEN-END:initComponents
    private void billIdActionPerformed(java.awt.event.ActionEvent evt) {//GEN-FIRST:event_billIdActionPerformed
    }//GEN-LAST:event_billIdActionPerformed

    private void prodNameActionPerformed(java.awt.event.ActionEvent evt) {//GEN-FIRST:event_prodNameActionPerformed
    }//GEN-LAST:event_prodNameActionPerformed

    private void prodQtyActionPerformed(java.awt.event.ActionEvent evt) {//GEN-FIRST:event_prodQtyActionPerformed
    }//GEN-LAST:event_prodQtyActionPerformed

    private void catCbActionPerformed(java.awt.event.ActionEvent evt) {//GEN-FIRST:event_catCbActionPerformed
    }//GEN-LAST:event_catCbActionPerformed
    int i = 0;
    private void addBtnActionPerformed(java.awt.event.ActionEvent evt) {//GEN-FIRST:event_addBtnActionPerformed
        if(prodQty.getText().isEmpty() || prodName.getText().isEmpty()){
            JOptionPane.showMessageDialog(this,"Information Missing");
        }
        else if(availQty <= Integer.valueOf(prodQty.getText())){
            JOptionPane.showMessageDialog(this,"Out of Stock");
        }
        else{
            i++;
            proTotal = uPrice * Integer.valueOf(prodQty.getText());
            overallTotal = overallTotal+proTotal;
            if(i==1){
                billTxt.setText(billTxt.getText()+"\t\tSTOP & SHOP\n"+"NUM\tPRODUCT\tPRICE\tQUANTITY\tTOTAL\n"+i+"\t"+prodName.getText()+"\t"+uPrice+"\t"+prodQty.getText()+"\t"+proTotal+"\n");
            }
            else{
                billTxt.setText(billTxt.getText()+i+"\t"+prodName.getText()+"\t"+uPrice+"\t"+prodQty.getText()+"\t"+proTotal+"\n");
            }
            overallLbl.setText("Rs. "+overallTotal);
            update();
        }
    }//GEN-LAST:event_addBtnActionPerformed

    private void printBtnActionPerformed(java.awt.event.ActionEvent evt) {//GEN-FIRST:event_printBtnActionPerformed
        // TODO add your handling code here:
        try{
            billTxt.print();
        }
        catch(Exception e){
            e.printStackTrace();
        }
    }//GEN-LAST:event_printBtnActionPerformed

    private void refreshBtnActionPerformed(java.awt.event.ActionEvent evt) {//GEN-FIRST:event_refreshBtnActionPerformed
        // TODO add your handling code here:
        selectFunc();
    }//GEN-LAST:event_refreshBtnActionPerformed
    Double uPrice, proTotal, overallTotal=0.0;
    int availQty;
    private void prodTableMouseClicked(java.awt.event.MouseEvent evt) {//GEN-FIRST:event_prodTableMouseClicked
        // TODO add your handling code here:
        DefaultTableModel model = (DefaultTableModel)prodTable.getModel();
        int myIndex = prodTable.getSelectedRow();
        Pid = Integer.valueOf(model.getValueAt(myIndex, 0).toString());
        availQty = Integer.valueOf(model.getValueAt(myIndex, 2).toString());
        prodName.setText(model.getValueAt(myIndex, 1).toString());
        uPrice = Double.valueOf(model.getValueAt(myIndex, 3).toString());
    }//GEN-LAST:event_prodTableMouseClicked

    private void clearBtnActionPerformed(java.awt.event.ActionEvent evt) {//GEN-FIRST:event_clearBtnActionPerformed
        // TODO add your handling code here:
        billId.setText("");
        prodName.setText("");
        prodQty.setText("");
    }//GEN-LAST:event_clearBtnActionPerformed

    private void exitBtnActionPerformed(java.awt.event.ActionEvent evt) {//GEN-FIRST:event_exitBtnActionPerformed
        // TODO add your handling code here:
        System.exit(0);
    }//GEN-LAST:event_exitBtnActionPerformed

    private void logoutBtnActionPerformed(java.awt.event.ActionEvent evt) {//GEN-FIRST:event_logoutBtnActionPerformed
        // TODO add your handling code here:
        new Login().setVisible(true);
        this.dispose();
    }//GEN-LAST:event_logoutBtnActionPerformed

    private void catCbItemStateChanged(java.awt.event.ItemEvent evt) {//GEN-FIRST:event_catCbItemStateChanged
        // TODO add your handling code here:
    }//GEN-LAST:event_catCbItemStateChanged

    private void filterBtnActionPerformed(java.awt.event.ActionEvent evt) {//GEN-FIRST:event_filterBtnActionPerformed
        // TODO add your handling code here:
        try{
            con = DriverManager.getConnection("jdbc:mysql://localhost:3306/Supermarket","root","root");
            st = con.createStatement();
            rs = st.executeQuery("Select * from Product where Prod_Cat = '"+catCb.getSelectedItem().toString()+"'");
            prodTable.setModel(DbUtils.resultSetToTableModel(rs));
        } catch(Exception e){
            e.printStackTrace();
        }
    }//GEN-LAST:event_filterBtnActionPerformed

    /**
     * @param args the command line arguments
     */
    public static void main(String args[]) {
        /* Set the Nimbus look and feel */
        //<editor-fold defaultstate="collapsed" desc=" Look and feel setting code (optional) ">
        /* If Nimbus (introduced in Java SE 6) is not available, stay with the default look and feel.
         * For details see http://download.oracle.com/javase/tutorial/uiswing/lookandfeel/plaf.html 
         */
        try {
            for (javax.swing.UIManager.LookAndFeelInfo info : javax.swing.UIManager.getInstalledLookAndFeels()) {
                if ("Nimbus".equals(info.getName())) {
                    javax.swing.UIManager.setLookAndFeel(info.getClassName());
                    break;
                }
            }
        } catch (ClassNotFoundException ex) {
            java.util.logging.Logger.getLogger(SellerInterface.class.getName()).log(java.util.logging.Level.SEVERE, null, ex);
        } catch (InstantiationException ex) {
            java.util.logging.Logger.getLogger(SellerInterface.class.getName()).log(java.util.logging.Level.SEVERE, null, ex);
        } catch (IllegalAccessException ex) {
            java.util.logging.Logger.getLogger(SellerInterface.class.getName()).log(java.util.logging.Level.SEVERE, null, ex);
        } catch (javax.swing.UnsupportedLookAndFeelException ex) {
            java.util.logging.Logger.getLogger(SellerInterface.class.getName()).log(java.util.logging.Level.SEVERE, null, ex);
        }
        //</editor-fold>

        /* Create and display the form */
        java.awt.EventQueue.invokeLater(new Runnable() {
            public void run() {
                new SellerInterface().setVisible(true);
            }
        });
    }

    // Variables declaration - do not modify//GEN-BEGIN:variables
    private javax.swing.JButton addBtn;
    private javax.swing.JTextField billId;
    private javax.swing.JTextArea billTxt;
    private javax.swing.JComboBox<String> catCb;
    private javax.swing.JButton clearBtn;
    private javax.swing.JButton exitBtn;
    private javax.swing.JButton filterBtn;
    private javax.swing.JLabel jLabel2;
    private javax.swing.JLabel jLabel3;
    private javax.swing.JLabel jLabel5;
    private javax.swing.JLabel jLabel6;
    private javax.swing.JLabel jLabel7;
    private javax.swing.JLabel jLabel9;
    private javax.swing.JPanel jPanel1;
    private javax.swing.JPanel jPanel2;
    private javax.swing.JScrollPane jScrollPane1;
    private javax.swing.JScrollPane jScrollPane2;
    private javax.swing.JButton logoutBtn;
    private javax.swing.JLabel overallLbl;
    private javax.swing.JButton printBtn;
    private javax.swing.JTextField prodName;
    private javax.swing.JTextField prodQty;
    private javax.swing.JTable prodTable;
    private javax.swing.JButton refreshBtn;
    // End of variables declaration//GEN-END:variables
}
